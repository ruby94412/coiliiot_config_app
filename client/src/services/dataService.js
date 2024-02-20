const { api } = window;

const dataService = {
  readLocalData: (args) => api.readLocalData(args),
  writeLocalData: (args) => api.writeLocalData(args),
  openExternalLink: (args) => api.openExternalLink(args),
  connectPort: (args) => api.connectPort(args),
  fetchFirmwareVersion: (args) => api.fetchFirmwareVersion(args),
  flashConnect: (args) => api.flashConnect(args),
  disconnectPort: (args) => api.disconnectPort(args),
  sendMsgToPort: (args) => api.sendMsgToPort(args),
  restartPort: (args) => api.restartPort(args),
  downloadFirmware: (args) => api.downloadFirmware(args),
  getFlashingFile: (args) => api.getFlashingFile(args),
  enableUpdate: () => api.enableUpdate(),
  fetchLatestFirmwareInfo: () => api.fetchLatestFirmwareInfo(),
  downloadAppUpdate: () => api.downloadAppUpdate(),
  serialPortsListener: (cb) => api.serialPortsListener(cb),
  serialDataListener: (cb) => api.serialDataListener(cb),
  updateListener: (cb) => api.updateListener(cb),
  firmwareDownloadListener: (cb) => api.firmwareDownloadListener(cb),
};

export default dataService;
