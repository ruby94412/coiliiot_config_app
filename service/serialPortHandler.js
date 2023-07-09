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

const connectPortListener = (mainWindow) => {
  ipcMain.handle('connect_serial_port', async (evt, args) => {
    try {
      const { path } = args;
      const baudRate = 115200;
  
      // Wrap the callback function in a Promise
      const result = await new Promise((resolve, reject) => {
        const port = new SerialPort({ path, baudRate }, (err) => {
          if (err) {
            reject(err); // Reject the promise if there is an error
          } else {
            resolve(port); // Resolve the promise with the value of port.isOpen
          }
        });
      });
      const parser = new ReadlineParser();
      result.pipe(parser);
      parser.on('data', (data) => {
        mainWindow.webContents.send('serial-data', data);
      });
      console.log(result.isOpen); // Log the result after the async operations complete
      return result.isOpen; // Return the result to the caller
    } catch (error) {
      console.error('An error occurred:', error);
      throw error; // Rethrow the error to the caller or handle it appropriately
    }
  });
};


module.exports = {
  sendSerialPorts,
  connectPortListener,
};