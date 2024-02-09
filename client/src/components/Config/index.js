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
  credential,
  config,
}) {
  const [initialValues, setInitialValues] = useState();
  const loadData = async () => {
    await readLocalData({ fileName: 'config' });
    await readLocalData({ fileName: 'credential' });
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const temp = getInitialValues(
      config || null,
      credential || null,
    );
    setInitialValues(temp);
  }, [credential, config]);

  return (
    initialValues ? (
      <ConfigContent
        loadData={loadData}
        update={writeLocalData}
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
    ) : (<></>)
  );
}

const mapStateToProps = (state) => {
  const { credential, config } = state.credentialAndConfig;
  return { credential, config };
};

export default connect(mapStateToProps, {
  readLocalData,
  writeLocalData,
})(Config);
