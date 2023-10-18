import {
  Snackbar,
  Alert,
  Tab,
  Tabs,
  Box,
  Button,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { connect } from 'react-redux';
import {
  useState, useRef, useEffect,
} from 'react';
import { FormattedMessage } from 'react-intl';
import messages from 'hocs/Locale/Messages/Config/ConfigContent';
import ConfirmDialog from 'components/common/ConfirmDialog';
import TabPanel from 'components/common/TabPanel';
import TransitionPanel from 'components/common/TransitionPanel';
import { handleFormDataSubmit, simplifyConfig, retrieveFromSimpleConfig } from './utils';
import Platform from './Platform';
import Serial from './Serial';
import Basic from './Basic';
import AutoPoll from './AutoPoll';
import ProductType from './ProductType';

const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
  color: 'red',
});

function Content({
  loadData,
  update,
  initialValues,
  setInitialValues,
  deviceConfig,
}) {
  const [saveLoading, setSaveLoading] = useState(false);
  const [isConfigResetting, setIsConfigResetting] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const buttonStyle = { position: 'fixed', right: '5%', bottom: '5%' };
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
    const { config, credential } = handleFormDataSubmit(formValues);
    setSaveLoading(true);
    try {
      await Promise.all([
        update({ data: { ...config }, fileName: 'config' }),
        update({ data: { ...credential }, fileName: 'credential' }),
      ]);
      loadData();
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
    if (!initialValues) return;
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

  const applyDeviceConfig = () => {
    if (!deviceConfig) return;
    const cfg = retrieveFromSimpleConfig(deviceConfig);
    formRef.basic.current.form.current.resetForm({ values: cfg.basicConfigs });
    for (let i = 0; i < formRef?.serial?.current?.form?.current?.length; i++) {
      formRef.serial.current.form.current[i].resetForm({ values: cfg.serialConfigs[i] });
    }
    for (let i = 0; i < formRef?.network?.current?.form?.current?.length; i++) {
      formRef.network.current.form.current[i].resetForm({ values: cfg.networkConfigs[i] });
    }
    for (let i = 0; i < formRef?.autoPoll?.current?.form?.current?.length; i++) {
      formRef.autoPoll.current.form.current[i].resetForm({ values: cfg.autoPollConfigs[i] });
    }
    setInitialValues(cfg);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(null);
  };

  const handleReset = () => {
    if (isDirty()) {
      setIsConfigResetting(true);
    }
  };

  useEffect(() => {
    applyDeviceConfig();
  }, [deviceConfig]);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '90%' }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="basic tabs"
          variant="scrollable"
        >
          <Tab label={<FormattedMessage {...messages.productTabLabel} />} {...a11yProps(0)} />
          <Tab label={<FormattedMessage {...messages.basicTabLabel} />} {...a11yProps(1)} />
          <Tab label={<FormattedMessage {...messages.serialTabLabel} />} {...a11yProps(2)} />
          <Tab label={<FormattedMessage {...messages.networkTabLabel} />} {...a11yProps(3)} />
          <Tab label={<FormattedMessage {...messages.autoPollLabel} />} {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TransitionPanel index={tabIndex} sx={{ p: 3 }}>
        <TabPanel value={tabIndex} index={0}>
          <ProductType />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <Basic
            initVals={initialValues?.basicConfigs}
            ref={(el) => { formRef.basic.current = el; }}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <Serial
            initVals={initialValues?.serialConfigs}
            ref={(el) => { formRef.serial.current = el; }}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={3}>
          <Platform
            initVals={initialValues?.networkConfigs}
            ref={(el) => { formRef.network.current = el; }}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={4}>
          <AutoPoll
            initVals={initialValues?.autoPollConfigs}
            ref={(el) => { formRef.autoPoll.current = el; }}
            networkForm={formRef.network.current}
          />
        </TabPanel>
      </TransitionPanel>
      <Box style={buttonStyle}>
        <Button onClick={handleReset} variant="contained" sx={{ mr: 2 }}>
          <FormattedMessage {...messages.resetButton} />
        </Button>
        <LoadingButton onClick={handleSubmit} loading={saveLoading} variant="contained">
          <FormattedMessage {...messages.submitButton} />
        </LoadingButton>
      </Box>
      <ConfirmDialog
        isOpen={isConfigResetting}
        onClose={() => { setIsConfigResetting(false); }}
        handleConfirmCb={() => {
          setIsConfigResetting(false);
          resetForm();
        }}
        content={<FormattedMessage {...messages.unsavedConfirm} />}
      />
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={2000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  const { deviceConfig } = state.credentialAndConfig;
  return { deviceConfig };
};

export default connect(mapStateToProps)(Content);
