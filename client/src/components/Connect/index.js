// import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { readLocalData, writeLocalData } from 'slice/data';
// import { Button } from '@mui/material';

// const { ipcRenderer } = window.require('electron');
function Connect({
  readConfig,
  writeConfig,
  readLocalData,
}) {
  // const [data, setData] = useState();
  // useEffect(() => {
  //   // readConfig().then((res) => {
  //   //   console.log(res);
  //   // });
  //   readLocalData({ fileName: 'config' }).then((res) => {
  //     console.log(res, 'asdfasdf');
  //   });
  // }, []);

  // const handleTest = () => {
  //   writeConfig({ from: 'client' }).then((res) => {
  //     console.log(res);
  //   });
  // };
  return (
    <div>
      TO DO
    </div>
  );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  readLocalData,
  writeLocalData,
})(Connect);
