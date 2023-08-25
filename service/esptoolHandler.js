const ipcMain = require('electron').ipcMain;

const runHandlers = (mainWindow) => {
  mainWindow.webContents.session.on('select-serial-port', (event, portList, webContents, callback) => {
    event.preventDefault();
    if (portList && portList.length > 0) {
      callback(portList[0].portId)
    } else {
      callback('');
    }
  })
};

const destroyHandlers = () => {
  
};

module.exports = { runHandlers, destroyHandlers };