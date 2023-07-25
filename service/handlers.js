const localDataHandler = require('./localDataHandler');
const serialPortHandler = require('./serialPortHandler');
const updateHandler = require('./updateHandler');

const runHandlers = (mainWindow) => {
  localDataHandler.runHandlers();
  serialPortHandler.runHandlers(mainWindow);
  updateHandler.runHandlers(mainWindow);
}

const distroyHandlers = () => {
  localDataHandler.destroyHandlers();
  serialPortHandler.destroyHandlers();
  updateHandler.distroyHandlers();
};

module.exports = {
  runHandlers,
  distroyHandlers,
};