const localDataHandler = require('./localDataHandler');
const serialPortHandler = require('./serialPortHandler');

const runHandlers = (mainWindow) => {
  localDataHandler.readAndWrite();
  setInterval(() => {
    serialPortHandler.sendSerialPorts(mainWindow);
  }, 2000);
  serialPortHandler.test();
}

module.exports = runHandlers;