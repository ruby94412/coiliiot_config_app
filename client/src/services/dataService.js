const { api } = window;

const dataService = {
  readLocalData: (args) => api.readLocalData(args),
  writeLocalData: (args) => api.writeLocalData(args),
  connectPort: (args) => api.connectPort(args),
  flashConnect: (args) => api.flashConnect(args),
  disconnectPort: (args) => api.disconnectPort(args),
  sendMsgToPort: (args) => api.sendMsgToPort(args),
  enableUpdate: () => api.enableUpdate(),
  downloadUpdate: () => api.downloadUpdate(),
  serialPortsListener: (cb) => api.serialPortsListener(cb),
  serialDataListener: (cb) => api.serialDataListener(cb),
  updateListener: (cb) => api.updateListener(cb),
};

export default dataService;
