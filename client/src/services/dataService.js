const { api } = window;

const dataService = {
  readLocalData: (args) => api.readLocalData(args),
  writeLocalData: (args) => api.writeLocalData(args),
};

export default dataService;
