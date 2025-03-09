const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const pollResources = require('./resourceManager')

var mainMenu = 'false'; 
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
};

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: false, 
      contextIsolation: true, 
    },
  });
  mainMenu = 'true'; 
  

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools(); 
};

//expose the main menu value to the renderer process
ipcMain.handle('getMainMenu', () => mainMenu);

//set up listener to handle messages from the renderer process
ipcMain.on('message-from-renderer', (event, arg) => {
  console.log('Message received from renderer:', arg); 
  event.reply('message-from-main', 'message received');
}
);


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong'); // this is the ipcRenderer.invoke('ping') function we exposed in preload.js
  createWindow();

  console.log('starting resource polling...');
  pollResources.pollResources();
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
