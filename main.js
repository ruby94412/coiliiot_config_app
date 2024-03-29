const { app, BrowserWindow, screen: electronScreen } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const { runHandlers, distroyHandlers } = require('./service/handlers');

const createMainWindow = () => {
  let mainWindow = new BrowserWindow({
    width: Math.max(electronScreen.getPrimaryDisplay().workArea.width / 2, 1000),
    height: Math.max(electronScreen.getPrimaryDisplay().workArea.height / 2, 800),
    show: false,
    backgroundColor: 'white',
    webPreferences: {
      preload: path.join(__dirname, './service/preload.js'),
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
    },
    title: 'Coiliiot Config',
    icon: path.join(__dirname, './img/icon.ico'),
  });
  const startURL = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, './client/build/index.html')}`;

  mainWindow.setMenu(null);
  mainWindow.loadURL(startURL);

  mainWindow.once('ready-to-show', () => mainWindow.show());

  mainWindow.on('closed', (e) => {
    // e.preventDefault();
    distroyHandlers();
    mainWindow = null;
  });

  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    mainWindow.loadURL(url);
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  runHandlers(mainWindow);
};

app.whenReady().then(() => {
  createMainWindow();
  app.on('activate', () => {
    if (!BrowserWindow.getAllWindows().length) {
      createMainWindow();
    }
  });
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
