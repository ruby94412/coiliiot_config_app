import {
  useState, useRef, forwardRef, useImperativeHandle,
} from 'react';
import {
  Grid, Collapse,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import messages from 'hocs/Locale/Messages/Config/Platform';
import TransitionPanel from 'components/common/TransitionPanel';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from 'components/common/StyledAccordion';
import TabPanel from 'components/common/TabPanel';
import TransmissionAccordion from './TransmissionAccordion';
import { renderFields, renderNetworkFields } from './utils';
import {
  networkIds, networkOptions,
} from './constants';

const Platform = forwardRef(({
  initVals,
  serialForm,
}, ref) => {
  const formikRefs = useRef([]);
  const [networkId, setNetworkId] = useState(0);
  const [serialIds, setSerialIds] = useState(0);
  const [expanded, setExpanded] = useState('networkFields');
  const serialIdsOptions = [
    { label: 'RS485', value: 0 }, { label: 'RS232', value: 1 },
  ];

  const enableOptions = [
    { label: <FormattedMessage {...messages.statusOptionEnable} />, value: true },
    { label: <FormattedMessage {...messages.statusOptionDisable} />, value: false },
  ];
  const handleNetworkIdChange = (event) => {
    setNetworkId(Number(event.target.value));
  };

  const handleEnabledChange = (index) => (e) => {
    const enabled = e.target.value === 'true';
    formikRefs.current[index].setFieldValue('enabled', enabled);
    if (enabled) setExpanded('networkFields');
  };

  const handleSerialIdsChange = (networkId) => (serialId) => (e) => {
    const val = e.target.checked;
    console.log(formikRefs.current[networkId].values);
    const temp = [...formikRefs.current[networkId].values.serialIds];
    temp[serialId] = val ? 1 : 0;
    formikRefs.current[networkId].setFieldValue('serialIds', temp);
    setSerialIds(temp);
    setExpanded('dataTransmissionFields');
  };

  const handleExpandChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useImperativeHandle(ref, () => ({
    form: formikRefs,
  }));

  return (
    <>
      <Grid
        container
        spacing={2}
        direction="row"
      >
        <Grid item xs={12}>
          {renderFields({
            label: <FormattedMessage {...messages.networkIdLabel} />,
            value: networkId,
            handleChange: handleNetworkIdChange,
            fieldType: 'radioGroup',
            datatype: 'number',
            layout: { xs: 12 },
            radioOptions: networkIds.map((id) => ({ label: id + 1, value: id })),
          })}
        </Grid>
      </Grid>
      <TransitionPanel index={networkId}>
        {
          initVals.map((networkConfig, index) => (
            <TabPanel key={index} index={index} value={networkId} sx={{ px: 0, py: 1 }}>
              <Formik
                innerRef={(el) => { formikRefs.current[index] = el; }}
                initialValues={networkConfig}
              >
                {(formikProps) => (
                  <>
                    <Grid
                      container
                      spacing={2}
                      direction="row"
                    >
                      {
                        renderFields({
                          label: <FormattedMessage {...messages.statusLabel} />,
                          value: formikProps.values.enabled,
                          name: 'enabled',
                          handleChange: handleEnabledChange(index),
                          fieldType: 'radioGroup',
                          radioOptions: enableOptions,
                          layout: { xs: 4 },
                        })
                      }
                      <Grid item xs={4}>
                        <Collapse in={formikProps.values.enabled} timeout={500} exit>
                          <Grid
                            container
                            spacing={2}
                            direction="row"
                          >
                            {renderFields({
                              label: <FormattedMessage {...messages.serialIdLabel} />,
                              value: Number(formikProps.values.serialIds),
                              handleChange: handleSerialIdsChange(index),
                              fieldType: 'checkbox',
                              checkboxOptions: serialIdsOptions,
                              layout: { xs: 12 },
                            })}
                          </Grid>
                        </Collapse>
                      </Grid>
                    </Grid>
                    <Collapse in={formikProps.values.enabled} timeout={500} exit style={{ marginTop: '10px' }}>
                      <Accordion expanded={expanded === 'networkFields'} onChange={handleExpandChange('networkFields')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <FormattedMessage {...messages.networkFields} />
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid
                            container
                            spacing={2}
                            direction="row"
                          >
                            {renderFields({
                              label: <FormattedMessage {...messages.platformTypeLabel} />,
                              value: formikProps.values.type,
                              name: 'type',
                              handleChange: formikProps.handleChange,
                              fieldType: 'select',
                              selectOptions: networkOptions,
                            })}
                            {renderNetworkFields(formikProps)}
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                      <TransmissionAccordion
                        expanded={expanded}
                        serialIds={serialIds}
                        serialForm={serialForm}
                        formikProps={formikProps}
                        handleExpandChange={handleExpandChange}
                      />
                    </Collapse>
                  </>
                )}
              </Formik>
            </TabPanel>
          ))
        }
      </TransitionPanel>
    </>
  );
});

export default Platform;
