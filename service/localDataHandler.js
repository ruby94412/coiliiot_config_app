const ipcMain = require('electron').ipcMain;
const fs = require('fs');
const path = require('path');
const Store = require('electron-store');

const readAndWrite = () => {
  const store = new Store();
  ipcMain.handle('read_local_data', async (evt, args) => {
    const { fileName } = args;
    return store.get(fileName);
    // const filePath = path.resolve(__dirname, `../assets/${args.fileName}.json`);
    // try {
    //   const rst = await new Promise((res, rej) => {
    //     fs.readFile(filePath, 'utf8', (err, data) => {
    //       if (err) rej(err);
    //       else res(data);
    //     });
    //   });
    //   return rst;
    // } catch (error) {
    //   throw error;
    // }
  });

  ipcMain.handle('write_data_to_local', async (evt, args) => {
    const { fileName, data } = args;
    store.set(fileName, data);
    return true;
    // const filePath = path.resolve(__dirname, `../assets/${args.fileName}.json`);
    // try {
    //   const rst = await new Promise((res, rej) => {
    //     fs.writeFile(filePath, JSON.stringify(args.data), (err, data) => {
    //       if (err) rej(err);
    //       else res({ success: true });
    //     });
    //   });
    //   return rst;
    // } catch (error) {
    //   throw error;
    // }
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