import {
  Fragment, forwardRef, useImperativeHandle, useRef,
} from 'react';
import { FormattedMessage } from 'react-intl';
import messages from 'hocs/Locale/Messages/Config/Basic';
import cstMsgs from 'hocs/Locale/Messages/Config/constants';
import {
  Grid, Divider, Collapse, InputAdornment,
} from '@mui/material';
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

  const enablePeriodChange = (e) => {
    formikRef.current.setFieldValue('restartSchedule', Number(e.target.value));
  };

  const enableDisconnectChange = (e) => {
    formikRef.current.setFieldValue('disconnectedRestart', Number(e.target.value));
  };

  const enableOptions = [
    { label: <FormattedMessage {...cstMsgs.enable} />, value: 1 },
    { label: <FormattedMessage {...cstMsgs.disable} />, value: 0 },
  ];

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
        {renderFields({
          label: <FormattedMessage {...cstMsgs.disconnectedRestart} />,
          value: formikProps.values.disconnectedRestart,
          name: 'disconnectedRestart',
          handleChange: enableDisconnectChange,
          fieldType: 'radioGroup',
          radioOptions: enableOptions,
          layout: { xs: 6, md: 3 },
        })}
        <Grid item xs={6} md={3}>
          <Collapse
            in={formikProps.values.disconnectedRestart === 1}
            timeout={500}
            exit
          >
            <Grid
              container
              spacing={2}
              direction="row"
            >
              {renderFields({
                label: <FormattedMessage
                  {...messages.delay}
                />,
                name: 'delay',
                value: formikProps.values.delay,
                handleChange: formikProps.handleChange,
                layout: { xs: 12 },
                style: { width: '80%' },
                datatype: 'number',
                endAdornment: <InputAdornment position="end"><FormattedMessage {...cstMsgs.second} /></InputAdornment>,
              })}
            </Grid>
          </Collapse>
        </Grid>
        {renderFields({
          label: <FormattedMessage {...cstMsgs.periodicalRestart} />,
          value: formikProps.values.restartSchedule,
          name: 'restartSchedule',
          handleChange: enablePeriodChange,
          fieldType: 'radioGroup',
          radioOptions: enableOptions,
          layout: { xs: 6, md: 3 },
        })}
        <Grid item xs={6} md={3}>
          <Collapse
            in={formikProps.values.restartSchedule === 1}
            timeout={500}
            exit
          >
            <Grid
              container
              spacing={2}
              direction="row"
            >
              {renderFields({
                label: <FormattedMessage
                  {...messages.period}
                />,
                name: 'restartPeriod',
                value: formikProps.values.restartPeriod,
                handleChange: formikProps.handleChange,
                layout: { xs: 12 },
                style: { width: '80%' },
                datatype: 'number',
                endAdornment: <InputAdornment position="end"><FormattedMessage {...cstMsgs.minute} /></InputAdornment>,
              })}
            </Grid>
          </Collapse>
        </Grid>
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
