const { app, BrowserWindow, screen: electronScreen } = require('electron');
// const isDev = require('electron-is-dev');
const path = require('path');

const createMainWindow = () => {
  let mainWindow = new BrowserWindow({
    // width: electronScreen.getPrimaryDisplay().workArea.width,
    // height: electronScreen.getPrimaryDisplay().workArea.height,
    width: 1000,
    height: 800,
    show: false,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: false
    },
    icon: __dirname + './icon.ico'
  });
  const startURL = `file://${path.join(__dirname, './client/build/index.html')}`;
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

  // mainWindow.webContents.openDevTools();
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