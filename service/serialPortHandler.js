const ipcMain = require('electron').ipcMain;
const { SerialPort, ReadlineParser } = require('serialport');
let portsForwardingInterval;
let activePort;
const getPortsForwardingInterval = (mainWindow) => (
  setInterval(async () => {
    if (!mainWindow) return;
    try {
      const ports = await SerialPort.list();
      mainWindow.webContents.send('serial-ports', ports);
    } catch (error) {
      throw error;
    }
  }, 2000)
);

const send_config_chuncks = async (activePort, args) => {
  const { data } = args;
  const data_str = JSON.stringify(data);
  let idx = 0;
  const chunks = [];
  while (idx < data_str.length) {
    chunks.push(data_str.substring(idx, Math.min(data_str.length, idx + 50)));
    idx += 50;
  }
  // send first package: { type: 1, size: stringSize }
  try {
    await new Promise((res, rej) => {
      console.log(JSON.stringify({ type: 1, size: chunks.length }));
      activePort.write(JSON.stringify({ type: 1, size: chunks.length }) + '\n', (err) => {
        if (err) rej(err);
        else res('Command Sent');
      });
    });
  } catch (error) {
    throw error;
  }
  // separate data into chunks and send respectively
  for (const chunk of chunks) {
    try {
      await new Promise((res, rej) => {
        setTimeout(() => {
          activePort.write(chunk + '\n', (err) => {
            if (err) rej(err);
            else res('chunk Sent');
          });
        }, 150);
      });
    } catch (error) { 
      throw error;
    }
  }
};

const connect_serial_port = async (path, cb) => {
  try {
    const baudRate = 115200;
    const connectedPort = await new Promise((res, rej) => {
      const port = new SerialPort(
        { path, baudRate },
        (err) => {
          if (err) rej(err);
          else res(port);
        }
      );
    });
    const parser = new ReadlineParser();
    
    connectedPort.pipe(parser);
    parser.on('data', cb);
    activePort = connectedPort;
    return {
      isOpen: connectedPort.isOpen
    };
  } catch (error) {
    throw error;
  }
};

const disconnect_serial_port = async () => {
  try {
    await new Promise((res, rej) => {
      activePort.close((err) => {
        if (err) rej(err);
        else res('disconnect Complete');
      });
    });
    return { isDisconnected: true };
  } catch (error) {
    throw error;
  }
};

const send_msg_to_port = async (args) => {
  if (args.type !== 1) {
    try {
      await new Promise((res, rej) => {
        activePort.write(JSON.stringify(args) + '\n', (err) => {
          if (err) rej(err);
          else res('Command Sent');
        });
      });
      return { success: true };
    } catch (error) {
      throw error;
    }
  } else {
    await send_config_chuncks(activePort, args);
  }
};

const portConnectionHandlers = (mainWindow) => {
  ipcMain.handle('fetch_firmware_version', async (evt, args) => {
    try {
      const version = await new Promise(async (res, rej) => {
        const { path } = args;
        let timeoutId;
        const cb = (data) => {
          if (data.startsWith('firmware version: ')) {
            const version = data.substring(18);
            clearTimeout(timeoutId);
            disconnect_serial_port();
            res(version);
          }
        };
        try {
          await connect_serial_port(path, cb);
        } catch (e) {
          rej(e.message);
        }
        timeoutId = setTimeout(() => {
          disconnect_serial_port();
          rej('version not available');
        }, 1500);
        try {
          await send_msg_to_port({ type: 3 });
        } catch (e) {
          rej(e.message);
        }
      });
      return version;
    } catch (e) {
      return '';
    }
    
  });

  ipcMain.handle('connect_serial_port', async (evt, args) => {
    const { path } = args;
    const cb = (data) => {
      mainWindow.webContents.send('serial-data', data);
    };
    connect_serial_port(path, cb);
  });

  ipcMain.handle('disconnect_serial_port', async (evt, args) => {
    disconnect_serial_port();
  });

  ipcMain.handle('send_msg_to_port', async (evt, args) => {
    send_msg_to_port(args);
  });

  ipcMain.handle('restart_port', async (evt, args) => {
    try {
      await new Promise((res, rej) => {
        activePort.set({ dtr: false }, (err) => {
          if (err) rej(err);
          else res('set dtr false complete');
        });
      });
    } catch (error) {
      throw error;
    }
    try {
      await new Promise((res, rej) => {
        activePort.set({ dtr: true }, (err) => {
          if (err) rej(err);
          else res('set dtr true complete');
        });
      });
    } catch (error) {
      throw error;
    }
    return { success: true };
  });
  return activePort;
};

const runHandlers = (mainWindow) => {
  portsForwardingInterval = getPortsForwardingInterval(mainWindow);
  portConnectionHandlers(mainWindow);
};

const destroyHandlers = () => {
  if (activePort?.isOpen) activePort.close();
  const channels = ['connect_serial_port', 'disconnect_serial_port', 'send_msg_to_port', 'restart_port', 'fetch_firmware_version'];
  channels.forEach((channel) => { ipcMain.removeHandler(channel);});
  clearInterval(portsForwardingInterval);
};

module.exports = {
  runHandlers,
  destroyHandlers,
};