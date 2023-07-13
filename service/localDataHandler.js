const ipcMain = require('electron').ipcMain;
const fs = require('fs');
const path = require('path');

const readAndWrite = () => {
  ipcMain.handle('read_local_data', (evt, args) => {
    const filePath = path.resolve(__dirname, `../data/${args.fileName}.json`);
    return fs.readFileSync(filePath, 'utf8');
  });

  ipcMain.handle('write_data_to_local', (evt, args) => {
    const filePath = path.resolve(__dirname, `../data/${args.fileName}.json`);
    return fs.writeFileSync(filePath, JSON.stringify(args.data));
  });
};

const runHandlers = () => {
  readAndWrite();
};

const destroyHandlers = () => {
  ipcMain.removeHandler('read_local_data');
  ipcMain.removeHandler('write_data_to_local');
};

module.exports = { runHandlers, destroyHandlers };