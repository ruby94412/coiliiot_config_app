const localDataHandler = require('./localDataHandler');
const serialPortHandler = require('./serialPortHandler');

const runHandlers = (mainWindow) => {
  localDataHandler.runHandlers();
  serialPortHandler.runHandlers(mainWindow);
}

const distroyHandlers = () => {
  localDataHandler.destroyHandlers();
  serialPortHandler.destroyHandlers();
};

module.exports = {
  runHandlers,
  distroyHandlers,
};