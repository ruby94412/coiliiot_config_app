const { autoUpdater } = require('electron-updater');
const shell = require('electron').shell;
const ipcMain = require('electron').ipcMain;
const isDev = require('electron-is-dev');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const info_url = 'https://api.github.com/repos/coiliiot/serial_server_firmware/releases/latest';
const downloadsDir =  path.join(__dirname, '../downloads');

const runHandlers = (mainWindow) => {
  if (!mainWindow) return;
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;

  if (isDev) {
    autoUpdater.setFeedURL({
      provider: 'github',
      owner: 'coiliiot',
      repo: 'serial_server_configuaration_app',
    });
  }
  
  autoUpdater.checkForUpdates();
  autoUpdater.on('update-not-available', () => {
    mainWindow.webContents.send('auto-update', {
      type: 'info',
      currentVersion: autoUpdater.currentVersion,
      updateAvailable: false,
    });
  });

  autoUpdater.on('update-available', (info) => {
    mainWindow.webContents.send('auto-update', {
      type: 'info',
      currentVersion: autoUpdater.currentVersion,
      updateAvailable: true,
      ...info
    });
  });

  autoUpdater.on('download-progress', (info) => {
    mainWindow.webContents.send('auto-update', {
      type: 'progress',
      ...info
    });
  });

  autoUpdater.on('update-downloaded', (info) => {
    mainWindow.webContents.send('auto-update', {
      type: 'downloaded',
      ...info
    });
  });

  ipcMain.handle('download_app_update', async () => {
    try {
      const res = autoUpdater.downloadUpdate();
      return res;
    } catch (err) {
      return err;
    }
  });

  ipcMain.handle('open_external_link', async (evt, args) => {
    const { url } = args;
    try {
      shell.openExternal(url);
    } catch (err) {
      return err;
    }
  });

  ipcMain.handle('fetch_latest_firmware_info', async () => {
    try {
      const raw_info = await axios.get(info_url);
      const { id, tag_name, name, body, html_url, published_at, assets } = raw_info.data;
      const temp = assets.filter((file) => (file?.name?.startsWith('firmware')));
      const { size, browser_download_url } = temp[0];
      const fileName = temp[0].name;
      const file = { size, url: browser_download_url, fileName };
      let downloaded = false;
      const filePath = path.join(downloadsDir, fileName);
      if (fs.existsSync(filePath)) {
        downloaded = true;
      }
      const info = {
        id, tag_name, name, body, html_url, file, downloaded, publishedAt: published_at,
      };
      return info;
    } catch (err) {
      return err;
    }
  });
  
  ipcMain.handle('download_firmware', async (evt, args) => {
    const { url, fileName } = args;
    try {
      const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream'
      });
      const totalLength = response.headers['content-length'];
      const filePath = path.join(downloadsDir, fileName);
      let downloadedLength = 0;
      response.data.on('data', (chunk) => {
          downloadedLength += chunk.length;
          const percentage = (downloadedLength / totalLength * 100);
          mainWindow.webContents.send('downloading_firmware', {
            type: 'progress',
            percentage,
          });
      });
      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);
      await new Promise((resolve, reject) => {
        writer.on('finish', () => {
          resolve();
        });
        writer.on('error', reject);
      });
    } catch (err) {
      return err;
    }
  });
  
  ipcMain.handle('get_flashing_file', async (evt, args) => {
    const { version } = args;
    const filePath = path.join(downloadsDir, `firmware_${version}.bin`);
    try {
      const buffer = fs.readFileSync(filePath);
      const binaryString = buffer.toString('binary');
      return binaryString;
    } catch (err) {
      return err;
    }
  });
}

const destroyHandlers = () => {
  autoUpdater.removeAllListeners();
  ipcMain.removeHandler('download_app_update');
  ipcMain.removeHandler('open_external_link');
  ipcMain.removeHandler('fetch_latest_firmware_info');
  ipcMain.removeHandler('download_firmware');
  ipcMain.removeHandler('get_flashing_file');
}

module.exports = {
  runHandlers,
  destroyHandlers,
};