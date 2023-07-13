const { api } = window;

const dataService = {
  readLocalData: (args) => api.readLocalData(args),
  writeLocalData: (args) => api.writeLocalData(args),
  connectPort: (args) => api.connectPort(args),
  disconnectPort: (args) => api.disconnectPort(args),
  sendMsgToPort: (args) => api.sendMsgToPort(args),
  serialPortsListener: (cb) => api.serialPortsListener(cb),
  serialDataListener: (cb) => api.serialDataListener(cb),
};

export default dataService;
