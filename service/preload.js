const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Invoke Methods
  readLocalData: (args) => ipcRenderer.invoke('read_local_data', args),
  writeLocalData:  (args) => ipcRenderer.invoke('write_data_to_local', args),
  serialPortsListener: (cb) => ipcRenderer.on('serial-ports', (e, data) => cb(data)),
  // Send Methods
  testSend: (args) => ipcRenderer.send('test-send', args),
  // Receive Methods
  testReceive: (callback) => ipcRenderer.on('test-receive', (event, data) => { callback(data) })
});
