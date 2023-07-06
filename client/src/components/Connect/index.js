// import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { readLocalData, writeLocalData } from 'slice/data';
import { Button, Box, Grid } from '@mui/material';
import ConnectOperation from './ConnectOperation';
import SerialMonitor from './SerialMonitor';

const testPorts = ['port1', 'port2'];
const testContent = '';
function Connect() {
  return (
    <Box sx={{ width: '100%' }}>
      <ConnectOperation ports={testPorts} />
      <SerialMonitor content={testContent} />
    </Box>
  );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  readLocalData,
  writeLocalData,
})(Connect);
