import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  readLocalData,
  writeLocalData,
} from 'slice/data';
import ConfigContent from './ConfigContent';
import { getInitialValues } from './utils';

function Config({
  readLocalData,
  writeLocalData,
}) {
  const [initialValues, setInitialValues] = useState();
  const loadData = () => {
    Promise.all([
      readLocalData({ fileName: 'config' }),
      readLocalData({ fileName: 'credential' }),
    ]).then((values) => {
      const temp = getInitialValues(
        values[0]?.payload || null,
        values[1]?.payload || null,
      );
      setInitialValues(temp);
    });
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    initialValues ? (
      <ConfigContent
        loadData={loadData}
        update={writeLocalData}
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
