const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Invoke Methods
  readLocalData: (args) => ipcRenderer.invoke('read_local_data', args),
  writeLocalData:  (args) => ipcRenderer.invoke('write_data_to_local', args),
  connectPort: (args) => ipcRenderer.invoke('connect_serial_port', args),
  disconnectPort: () => ipcRenderer.invoke('disconnect_serial_port'),
  sendMsgToPort: (args) => ipcRenderer.invoke('send_msg_to_port', args),
  flashConnect: (args) => ipcRenderer.invoke('connect_flash_port', args),
  restartPort: (args) => ipcRenderer.invoke('restart_port', args),
  openExternalLink: (args) => ipcRenderer.invoke('open_external_link', args),
  downloadFirmware: (args) => ipcRenderer.invoke('download_firmware', args),
  getFlashingFile: (args) => ipcRenderer.invoke('get_flashing_file', args),

  enableUpdate: () => ipcRenderer.invoke('enable_update'),
  downloadAppUpdate: () => ipcRenderer.invoke('download_app_update'),
  fetchLatestFirmwareInfo: () => ipcRenderer.invoke('fetch_latest_firmware_info'),
  serialPortsListener: (cb) => ipcRenderer.on('serial-ports', (e, data) => cb(data)),
  serialDataListener: (cb) => ipcRenderer.on('serial-data', (e, data) => cb(data)),
  updateListener: (cb) => ipcRenderer.on('auto-update', (e, data) => cb(data)),
  firmwareDownloadListener: (cb) => ipcRenderer.on('downloading_firmware', (e, data) => cb(data)),
  // Send Methods
  testSend: (args) => ipcRenderer.send('test-send', args),
  // Receive Methods
  testReceive: (callback) => ipcRenderer.on('test-receive', (event, data) => { callback(data) })
});
