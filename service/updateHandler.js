const { autoUpdater } = require('electron-updater');
const ipcMain = require('electron').ipcMain;
const isDev = require('electron-is-dev');

const runHandlers = (mainWindow) => {
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = false;

  if (isDev) {
    autoUpdater.setFeedURL({
      provider: 'github',
      owner: 'ruby94412',
      repo: 'coiliiot_config_app',
    });
  }
  
  autoUpdater.checkForUpdates();
  autoUpdater.on('update-not-available', () => {
    mainWindow?.webContents.send('auto-update', {
      type: 'info',
      currentVersion: autoUpdater.currentVersion,
      updateAvailable: false,
    });
  });

  autoUpdater.on('update-available', (info) => {
    mainWindow?.webContents.send('auto-update', {
      type: 'info',
      currentVersion: autoUpdater.currentVersion,
      updateAvailable: true,
      ...info
    });
  });

  autoUpdater.on('download-progress', (info) => {
    mainWindow?.webContents.send('auto-update', {
      type: 'progress',
      ...info
    });
  });

  autoUpdater.on('update-downloaded', (info) => {
    mainWindow?.webContents.send('auto-update', {
      type: 'downloaded',
      ...info
    });
  });

  ipcMain.handle('download_update', () => {
    autoUpdater.autoDownload = true;
    autoUpdater.autoInstallOnAppQuit = true;
    return autoUpdater.checkForUpdates();
  });

  
}

const distroyHandlers = () => {
  autoUpdater.removeAllListeners();
  ipcMain.removeHandler('download_update');
}

module.exports = {
  runHandlers,
  distroyHandlers,
};