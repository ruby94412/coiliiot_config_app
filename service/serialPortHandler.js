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
      delay(1000);
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

const portConnectionHandlers = (mainWindow) => {
  ipcMain.handle('connect_serial_port', async (evt, args) => {
    try {
      const { path } = args;
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
      parser.on('data', (data) => {
        mainWindow.webContents.send('serial-data', data);
      });
      activePort = connectedPort;
      return {
        isOpen: connectedPort.isOpen
      };
    } catch (error) {
      throw error;
    }
  });

  ipcMain.handle('disconnect_serial_port', async (evt, args) => {
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
  });

  ipcMain.handle('send_msg_to_port', async (evt, args) => {
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
  if (!activePort) return;
  if (activePort.isOpen) activePort.close();
  const channels = ['connect_serial_port', 'disconnect_serial_port', 'send_msg_to_port', 'restart_port'];
  channels.forEach((channel) => { ipcMain.removeHandler(channel);});
  clearInterval(portsForwardingInterval);
};

module.exports = {
  runHandlers,
  destroyHandlers,
};