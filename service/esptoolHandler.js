const ipcMain = require('electron').ipcMain;
// const { ESPLoader, Transport } = require('esptool-js');
const { SerialPort, ReadlineParser } = require('serialport');
const { ESPLoader, Transport } = require('../lib');

let esploader;
let transport;

const espLoaderTerminal = {
  clean() {
    console.log('clean');
  },
  writeLine(data) {
    console.log(data, 'writeline');
  },
  write(data) {
    console.log(data, 'write');
  },
};

const flashHandlers = (mainWindow) => {
  ipcMain.handle('connect_flash_port', async (evt, args) => {
    try {
      const { path } = args;
      const baudRate = 460800;
      const connectedPort = await new Promise((res, rej) => {
        const port = new SerialPort(
          { path, baudRate },
          (err) => {
            if (err) rej(err);
            else res(port);
          }
        );
      });
      const parser = new ReadlineParser();
      connectedPort.pipe(parser);
      parser.on('data', (data) => {
        mainWindow.webContents.send('flash-serial-data', data);
      });
      transport = new Transport(connectedPort);
      esploader = new ESPLoader({
        transport,
        baudrate: 460800,
        terminal: espLoaderTerminal,
      });
      let chip = await esploader.main_fn();
      console.log(chip, '---chip');
      return {
        isOpen: connectedPort.isOpen
      };
    } catch (error) {
      throw error;
    }
  });
}

const runHandlers = () => {
  flashHandlers();
};

const destroyHandlers = () => {
  ipcMain.removeHandler('connect_flash_port');
};

module.exports = { runHandlers, destroyHandlers };