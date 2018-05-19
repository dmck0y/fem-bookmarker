const { app, BrowserWindow } = require('electron');

let mainWindow;

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    show: false
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);
});
