// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron')


//this exposes functions and variables to the renderer process 
//unused code from tutorail
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'), 
});

//expose navigation information from main.js to the renderer process 
contextBridge.exposeInMainWorld('navigationn',{

  //example of sending backend variable to front end
  getMainMenu: () => ipcRenderer.invoke('getMainMenu'), 
  //example of sending frontend message to backend 
  sendMessage: (message) => ipcRenderer.send('message-from-renderer', message), 
  //example of back end receiving message and responding 
  onMessageReceived: (callback) => ipcRenderer.on('message-from-main',callback), 
  
  getStaticData: () => console.log('static'),
});