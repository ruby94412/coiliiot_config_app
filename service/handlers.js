const localDataHandler = require('./localDataHandler');
const serialPortHandler = require('./serialPortHandler');
const updateHandler = require('./updateHandler');
const esptoolHandler = require('./esptoolHandler');

const runHandlers = (mainWindow) => {
  localDataHandler.runHandlers();
  serialPortHandler.runHandlers(mainWindow);
  updateHandler.runHandlers(mainWindow);
  esptoolHandler.runHandlers(mainWindow);
}

const destroyHandlers = () => {
  localDataHandler.destroyHandlers();
  serialPortHandler.destroyHandlers();
  updateHandler.destroyHandlers();
  esptoolHandler.destroyHandlers();
};

module.exports = {
  runHandlers,
  destroyHandlers,
};