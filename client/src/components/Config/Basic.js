import {
  Fragment, forwardRef, useImperativeHandle, useRef,
} from 'react';
import { FormattedMessage } from 'react-intl';
import messages from 'hocs/Locale/Messages/Config/Basic';
import { Grid, Divider } from '@mui/material';
import { Formik } from 'formik';
import { basicFields, credentialFields } from './constants';
import { renderFields } from './utils';

const Basic = forwardRef(({
  initVals,
}, ref) => {
  const formikRef = useRef();
  useImperativeHandle(ref, () => ({
    form: formikRef,
  }));

  const renderContent = (formikProps) => (
    <>
      <Grid
        container
        spacing={2}
        direction="row"
      >
        {basicFields.map((field) => (
          <Fragment key={field.propertyName}>
            {renderFields({
              value: formikProps.values[field.propertyName],
              name: `${field.propertyName}`,
              handleChange: formikProps.handleChange,
              ...field,
            })}
          </Fragment>
        ))}
      </Grid>
      <Divider sx={{ my: 5 }}><FormattedMessage {...messages.wifiDivider} /></Divider>
      <Grid
        container
        spacing={2}
        direction="row"
      >
        {credentialFields.map((field) => (
          <Fragment key={field.propertyName}>
            {renderFields({
              value: formikProps.values.credential[field.propertyName],
              name: `credential.${field.propertyName}`,
              handleChange: formikProps.handleChange,
              ...field,
            })}
          </Fragment>
        ))}
      </Grid>
    </>
  );
  return (
    <Formik initialValues={initVals} innerRef={formikRef}>
      {(formikProps) => (renderContent(formikProps))}
    </Formik>
  );
});

export default Basic;
