import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  Tab,
  Tabs,
  Box,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
  useState, forwardRef, useImperativeHandle, useRef,
} from 'react';
import { FormattedMessage } from 'react-intl';
import messages from 'hocs/Locale/Messages/ConfigPanel/ConfigDialog/DialogContent';
import SwipeableViews from 'react-swipeable-views';
import TabPanel from 'components/common/TabPanel';
import { handleFormDataSubmit } from './utils';
import Platform from './Platform';
import Serial from './Serial';
import Basic from './Basic';
import AutoPoll from './AutoPoll';
import DataConversion from './DataConversion';

const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
  color: 'red',
});

const Content = forwardRef(({
  // groupRow,
  // onClose,
  updateConfig,
  initialValues,
}, ref) => {
  const [saveLoading, setSaveLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  const formRef = {
    basic: useRef(null),
    serial: useRef(null),
    network: useRef(null),
    autoPoll: useRef(null),
  };
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleSubmit = async () => {
    const formValues = {};
    formValues.basicConfigs = formRef.basic.current.form.current.values;
    formValues.serialConfigs = formRef.serial.current.form.current
      .map((serialForm) => (serialForm.values));
    formValues.networkConfigs = formRef.network.current.form.current
      .map((networkForm) => (networkForm.values));
    formValues.autoPollConfigs = formRef.autoPoll.current.form.current
      .map((autoPollForm) => (autoPollForm.values));
    const config = handleFormDataSubmit(formValues);
    setSaveLoading(true);
    try {
      await updateConfig({
        // ...groupRow,
        config,
        fileName: 'config',
      });
      setSnackbar({
        children: <FormattedMessage {...messages.snackBarSuccess} />, severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        children: <FormattedMessage {...messages.snackBarError} />, severity: 'error',
      });
    }
    setSaveLoading(false);
  };

  const isDirty = () => {
    if (formRef.basic?.current?.form?.current?.dirty) return true;
    for (let i = 0; i < formRef?.serial?.current?.form?.current?.length; i++) {
      if (formRef.serial.current.form.current[i].dirty) return true;
    }
    for (let i = 0; i < formRef?.network?.current?.form?.current?.length; i++) {
      if (formRef.network.current.form.current[i].dirty) return true;
    }
    for (let i = 0; i < formRef?.autoPoll?.current?.form?.current?.length; i++) {
      if (formRef.autoPoll.current.form.current[i].dirty) return true;
    }
    return false;
  };

  const resetForm = () => {
    formRef.basic.current.form.current.resetForm();
    for (let i = 0; i < formRef?.serial?.current?.form?.current?.length; i++) {
      formRef.serial.current.form.current[i].resetForm();
    }
    for (let i = 0; i < formRef?.network?.current?.form?.current?.length; i++) {
      formRef.network.current.form.current[i].resetForm();
    }
    for (let i = 0; i < formRef?.autoPoll?.current?.form?.current?.length; i++) {
      formRef.autoPoll.current.form.current[i].resetForm();
    }
  };

  useImperativeHandle(ref, () => ({
    dirty: isDirty(),
  }));

  const handleCloseSnackbar = () => {
    setSnackbar(null);
    // onClose(false);
    // resetForm();
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="basic tabs"
          variant="scrollable"
        >
          <Tab label={<FormattedMessage {...messages.basicTabLabel} />} {...a11yProps(0)} />
          <Tab label={<FormattedMessage {...messages.serialTabLabel} />} {...a11yProps(1)} />
          <Tab label={<FormattedMessage {...messages.networkTabLabel} />} {...a11yProps(2)} />
          <Tab label={<FormattedMessage {...messages.autoPollLabel} />} {...a11yProps(3)} />
          <Tab label={<FormattedMessage {...messages.dataConvertLabel} />} {...a11yProps(4)} />
        </Tabs>
      </Box>
      <SwipeableViews index={tabIndex}>
        <TabPanel value={tabIndex} index={0}>
          <Basic
            initVals={initialValues?.basicConfigs}
            ref={(el) => { formRef.basic.current = el; }}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <Serial
            initVals={initialValues?.serialConfigs}
            ref={(el) => { formRef.serial.current = el; }}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <Platform
            initVals={initialValues?.networkConfigs}
            ref={(el) => { formRef.network.current = el; }}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={3}>
          <AutoPoll
            initVals={initialValues?.autoPollConfigs}
            ref={(el) => { formRef.autoPoll.current = el; }}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={4}>
          <DataConversion
            networkForm={formRef.network.current}
            autoPollForm={formRef.autoPoll.current}
            initVals={initialValues?.conversionConfigs}
          />
        </TabPanel>
      </SwipeableViews>

      {/* <Button onClick={() => { onClose(isDirty()); }} variant="contained">
          <FormattedMessage {...messages.cancelButton} />
        </Button> */}
      <LoadingButton onClick={handleSubmit} loading={saveLoading} variant="contained">
        <FormattedMessage {...messages.submitButton} />
      </LoadingButton>
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={2000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </>
  );
});

export default Content;
