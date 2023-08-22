const ipcMain = require('electron').ipcMain;
// const { ESPLoader, Transport } = require('esptool-js');
const { ReadlineParser, SerialPort } = require('serialport');
const { ESPLoader, Transport } = require('../lib');

let esploader;
let transport;
let device;
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
      const { path, vendorId, productId } = args;
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
      
      // const parser = new ReadlineParser();
      // connectedPort.pipe(parser);
      // parser.on('data', (data) => {
      //   console.log('asdfasfasdf==========', data);
      //   mainWindow.webContents.send('flash-serial-data', data);
      // });
      connectedPort.pause();
      device = connectedPort;
      transport = new Transport(connectedPort, {usbVendorId: vendorId, usbProductId: productId});
      // esploader = new ESPLoader({
      //   transport,
      //   baudrate: 460800,
      //   terminal: espLoaderTerminal,
      // });
      // let chip = await esploader.main_fn();
      try {
        const flashOptions = {
          transport,
          baudrate: 460800,
          terminal: espLoaderTerminal,
        };
        esploader = new ESPLoader(flashOptions);
    
        chip = await esploader.main_fn();
    
        // Temporarily broken
        // await esploader.flash_id();
      } catch (e) {
        console.error(e);
      }
      console.log(chip, '---chip');
      return {
        isOpen: connectedPort.isOpen
      };
    } catch (error) {
      throw error;
    }
  });
}

const runHandlers = (mainWindow) => {
  flashHandlers(mainWindow);
};

const destroyHandlers = () => {
  ipcMain.removeHandler('connect_flash_port');
};

module.exports = { runHandlers, destroyHandlers };