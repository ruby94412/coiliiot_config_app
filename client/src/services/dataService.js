const { api } = window;

const dataService = {
  readLocalData: (args) => api.readLocalData(args),
  writeLocalData: (args) => api.writeLocalData(args),
  connectPort: (args) => api.connectPort(args),
  serialPortsListener: (cb) => api.serialPortsListener(cb),
};

export default dataService;
