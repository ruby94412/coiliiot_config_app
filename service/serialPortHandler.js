// const ipcMain = require('electron').ipcMain;
// const { SerialPort, ReadlineParser } = require('serialport');

import { ipcMain } from 'electron';
import { SerialPort, ReadlineParser } from 'serialport';

let portsForwardingInterval;
let activePort;
const getPortsForwardingInterval = (mainWindow) => (
  setInterval(async () => {
    if (!mainWindow) return;
    try {
      const ports = await SerialPort.list();
      mainWindow?.webContents.send('serial-ports', ports);
    } catch (error) {
      throw error;
    }
  }, 2000)
);

const portConnectionHandlers = (mainWindow) => {
  ipcMain.handle('connect_serial_port', async (evt, args) => {
    try {
      const { path, isFlash } = args;
      const baudRate = isFlash ? 460800 : 115200;
      const connectedPort = await new Promise((res, rej) => {
        const port = new SerialPort(
          { path, baudRate },
          (err) => {
            if (err) rej(err);
            else res(port);
          }
        );
        port.on('open', () => {
          port.write('restart');
        });
      });
      const parser = new ReadlineParser();
      connectedPort.pipe(parser);
      parser.on('data', (data) => {
        mainWindow.webContents.send('serial-data', data);
      });
      activePort = connectedPort;
      return {
        isOpen: connectedPort.isOpen
      };
    } catch (error) {
      throw error;
    }
  });

  ipcMain.handle('disconnect_serial_port', async (evt, args) => {
    try {
      await new Promise((res, rej) => {
        activePort.close((err) => {
          if (err) rej(err);
          else res('disconnect Complete');
        });
      });
      return { isDisconnected: true };
    } catch (error) {
      throw error;
    }
  });

  ipcMain.handle('send_msg_to_port', async (evt, args) => {
    try {
      await new Promise((res, rej) => {
        activePort.write(JSON.stringify(args, null, 2), (err) => {
          if (err) rej(err);
          else res('Command Sent');
        });
      });
      return { success: true };
    } catch (error) {
      throw error;
    }
  });
  return activePort;
};

const runHandlers = (mainWindow) => {
  portsForwardingInterval = getPortsForwardingInterval(mainWindow);
  portConnectionHandlers(mainWindow);
};

const destroyHandlers = () => {
  if (activePort?.isOpen) activePort.close();
  const channels = ['connect_serial_port', 'disconnect_serial_port', 'send_msg_to_port'];
  channels.forEach((channel) => { ipcMain.removeHandler(channel);});
  clearInterval(portsForwardingInterval);
};

module.exports = {
  runHandlers,
  destroyHandlers,
};