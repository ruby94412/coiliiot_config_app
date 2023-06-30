import { Dialog } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { readLocalData, writeLocalData } from 'slice/data';
import DialogContent from './DialogContent';
import { getInitialValues } from './utils';

const dialogStyle = {
  backgroundColor: 'secondary.main',
  minWidth: '70%',
};

function Config({
  readLocalData,
  writeLocalData,
}) {
  const [initialValues, setInitialValues] = useState();
  const ref = useRef();

  useEffect(() => {
    // if (groupRow) {
    //   setInitialValues(getInitialValues(groupRow.config));
    //   // setInitialFormValues(groupRow.config);
    // }
    readLocalData({ fileName: 'config' }).then((res) => {
      console.log(res, 'asdfasdfasdf');
      setInitialValues(getInitialValues(res.payload));
    });
  }, []);

  return (
    // <Dialog
    //   maxWidth="xs"
    //   open={!!groupRow}
    //   onClose={() => { onClose(ref.current.dirty); }}
    //   PaperProps={{ style: dialogStyle }}
    // >
    //   <DialogContent
    //     ref={ref}
    //     groupRow={groupRow}
    //     updateConfig={updateConfig}
    //     onClose={onClose}
    //     initialValues={initialValues}
    //   />
    // </Dialog>
    initialValues ? (
      <DialogContent
        ref={ref}
        // groupRow={groupRow}
        updateConfig={writeLocalData}
        // onClose={onClose}
        initialValues={initialValues}
      />
    ) : (<></>)
  );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  readLocalData,
  writeLocalData,
})(Config);
