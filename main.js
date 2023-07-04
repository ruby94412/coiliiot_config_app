const { app, BrowserWindow, screen: electronScreen, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const localDataHandler = require('./service/localDataHandler').localDataHandler;

const createMainWindow = () => {
  let mainWindow = new BrowserWindow({
    width: electronScreen.getPrimaryDisplay().workArea.width / 2,
    height: electronScreen.getPrimaryDisplay().workArea.height / 2,
    // width: 1000,
    // height: 800,
    show: false,
    backgroundColor: 'white',
    webPreferences: {
      preload: path.join(__dirname, './service/preload.js'),
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
    },
    icon: path.join(__dirname, './img/icon.ico'),
  });
  const startURL = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, './client/build/index.html')}`;

  mainWindow.setMenu(null);
  mainWindow.loadURL(startURL);

  mainWindow.once('ready-to-show', () => mainWindow.show());

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    mainWindow.loadURL(url);
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
};

app.whenReady().then(() => {
  createMainWindow();
  app.on('activate', () => {
    if (!BrowserWindow.getAllWindows().length) {
      createMainWindow();
    }
  });
});

localDataHandler();

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
