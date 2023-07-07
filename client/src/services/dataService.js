const { api } = window;

const dataService = {
  readLocalData: (args) => api.readLocalData(args),
  writeLocalData: (args) => api.writeLocalData(args),
  serialPortsListener: (cb) => api.serialPortsListener(cb),
};

export default dataService;
