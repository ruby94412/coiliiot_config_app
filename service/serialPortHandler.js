const ipcMain = require('electron').ipcMain;
const { SerialPort, ReadlineParser } = require('serialport');

const sendSerialPorts = async (mainWindow) => {
  try {
    const ports = await SerialPort.list();
    mainWindow.webContents.send('serial-ports', ports);
  } catch (err) {
    console.log(err);
  }
}

const connectPort = (mainWindow) => {
  ipcMain.handle('connect_serial_port', (evt, args) => {
    const { path } = args;
    const baudRate = 115200;
    const port = new SerialPort({ path, baudRate });
    const parser = new ReadlineParser();
    port.pipe(parser);
    port.write('to_Connect');
    parser.on('data', (data) => {
      mainWindow.webContents.send('serial-data', data);
    });
  });
};


module.exports = {
  sendSerialPorts,
  connectPort,
  test,
};