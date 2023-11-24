import {
  useState, Fragment, useRef, forwardRef, useImperativeHandle,
} from 'react';
import { Grid, Collapse } from '@mui/material';
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
import { renderFields } from './utils';
import {
  networkIds, networkOptions, aliyunFields, mqttFields, socketFields, httpFields, azureFields,
} from './constants';

const Platform = forwardRef(({
  initVals,
}, ref) => {
  const formikRefs = useRef([]);
  const [networkId, setNetworkId] = useState(0);
  const [expanded, setExpanded] = useState('platformFields');

  const enableOptions = [
    { label: <FormattedMessage {...messages.statusOptionEnable} />, value: true },
    { label: <FormattedMessage {...messages.statusOptionDisable} />, value: false },
  ];
  const handleNetworkIdChange = (event) => {
    setNetworkId(Number(event.target.value));
  };

  const handleEnabledChange = (index) => (e) => {
    formikRefs.current[index].setFieldValue('enabled', e.target.value === 'true');
  };

  const renderNetwork = (formikProps) => {
    const { type, aliyun } = formikProps.values;
    let fields;
    let typeName;
    switch (type) {
      case 4:
        fields = azureFields;
        typeName = 'azure';
        break;
      case 3:
        fields = httpFields;
        typeName = 'http';
        break;
      case 2:
        fields = mqttFields;
        typeName = 'mqtt';
        break;
      case 1:
        fields = aliyunFields;
        typeName = 'aliyun';
        break;
      case 0:
      default:
        fields = socketFields;
        typeName = 'socket';
        break;
    }
    const shouldUnmount = (field) => {
      const condition = (
        typeName === 'aliyun'
          && Number(aliyun.registerType) === 0
          && field.propertyName === 'productSecret'
      ) || (
        typeName === 'aliyun'
          && Number(aliyun.registerType) === 1
          && field.propertyName === 'deviceSecret'
      );
      return condition;
    };

    return (
      <>
        {fields.map((field) => (
          <Fragment key={field.propertyName}>
            {
              shouldUnmount(field) ? (<></>)
                : (
                  <>
                    {
                      renderFields({
                        value: formikProps.values[typeName][field.propertyName],
                        name: `${typeName}.${field.propertyName}`,
                        handleChange: formikProps.handleChange,
                        ...field,
                      })
                    }
                  </>
                )
            }
          </Fragment>
        ))}
      </>
    );
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
                              value: Number(formikProps.values.serialId),
                              name: 'serialId',
                              handleChange: formikProps.handleChange,
                              fieldType: 'radioGroup',
                              radioOptions: [
                                { label: '1', value: 0 },
                                { label: '2', value: 1 },
                                { label: '3', value: 2 },
                              ],
                              layout: { xs: 12 },
                            })}
                          </Grid>
                        </Collapse>
                      </Grid>
                    </Grid>
                    <Collapse in={formikProps.values.enabled} timeout={500} exit style={{ marginTop: '10px' }}>
                      <Accordion expanded={expanded === 'serialFields'} onChange={handleExpandChange('serialFields')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <FormattedMessage {...messages.serialIdLabel} />
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
                            {renderNetwork(formikProps)}
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
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
