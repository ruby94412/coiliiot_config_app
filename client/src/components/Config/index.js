import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { readLocalData, writeLocalData } from 'slice/data';
import ConfigContent from './ConfigContent';
import { getInitialValues } from './utils';

function Config({
  readLocalData,
  writeLocalData,
}) {
  const [initialValues, setInitialValues] = useState();
  const ref = useRef();

  useEffect(() => {
    readLocalData({ fileName: 'config' }).then((res) => {
      console.log(res);
      const temp = getInitialValues(JSON.parse(res.payload));
      console.log(temp);
      setInitialValues(temp);
    });
  }, []);

  return (
    initialValues ? (
      <ConfigContent
        ref={ref}
        updateConfig={writeLocalData}
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
