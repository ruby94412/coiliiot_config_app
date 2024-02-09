import {
  useState, Fragment, useRef, forwardRef, useImperativeHandle, useEffect,
} from 'react';
import { Grid, Collapse, Typography } from '@mui/material';
import TransitionPanel from 'components/common/TransitionPanel';
import TabPanel from 'components/common/TabPanel';
import { FormattedMessage } from 'react-intl';
import messages from 'hocs/Locale/Messages/Config/Serial';
import { Formik } from 'formik';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from 'components/common/StyledAccordion';
import AutoPollTable from './AutoPollTable';
import { serialFields, autoPollFields } from './constants';
import { renderFields, convertRawCommands, commandRowsToFields } from './utils';

const Serial = forwardRef(({
  initVals,
}, ref) => {
  const [serialId, setSerialId] = useState(0);
  const [expanded, setExpanded] = useState('serialFields');
  const [rows, setRows] = useState([]);
  const serialIdOptions = [
    { label: 'RS485', value: 0 }, { label: 'RS232', value: 1 },
  ];
  const enableOptions = [
    { label: <FormattedMessage {...messages.statusOptionEnable} />, value: true },
    { label: <FormattedMessage {...messages.statusOptionDisable} />, value: false },
  ];

  const formikRefs = useRef([]);

  const handleSerialIdChange = (event) => {
    setSerialId(Number(event.target.value));
  };

  const handleEnabledChange = (index) => (e) => {
    const enabled = e.target.value === 'true';
    setExpanded((pre) => (enabled ? 'serialFields' : pre));
    formikRefs.current[index].setFieldValue('enabled', enabled);
  };

  const handleExpandChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleAutoPollEnabledChange = (index) => (e) => {
    const enabled = e.target.value === 'true';
    setExpanded(enabled ? 'autoPollFields' : 'serialFields');
    formikRefs.current[index].setFieldValue('autoPollEnabled', enabled);
  };

  const initRows = () => {
    if (formikRefs.current[serialId].values.autoPollEnabled) {
      setRows(convertRawCommands(formikRefs.current[serialId].values));
    } else {
      setRows([]);
    }
  };

  useEffect(() => {
    initRows();
  }, [serialId, initVals]);

  const setCommandsField = (tempRows) => {
    const commands = commandRowsToFields(tempRows);
    formikRefs.current[serialId].setFieldValue('commands', commands);
  };

  useImperativeHandle(ref, () => ({
    form: formikRefs,
    initRows,
  }));

  return (
    <>
      <Grid
        container
        spacing={2}
        direction="row"
      >
        {
          renderFields({
            label: <FormattedMessage {...messages.serialIdLabel} />,
            value: serialId,
            handleChange: handleSerialIdChange,
            fieldType: 'radioGroup',
            radioOptions: serialIdOptions,
            layout: { xs: 4 },
          })
        }
      </Grid>
      <TransitionPanel index={serialId}>
        {
          initVals.map((serialConfig, index) => (
            <TabPanel key={index} index={index} value={serialId} sx={{ px: 0, py: 1 }}>
              <Formik
                innerRef={(el) => { formikRefs.current[index] = el; }}
                initialValues={serialConfig}
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
                            {
                              renderFields({
                                label: <FormattedMessage {...messages.autoPollStatusLabel} />,
                                value: formikProps.values.autoPollEnabled,
                                name: 'autoPollEnabled',
                                handleChange: handleAutoPollEnabledChange(index),
                                fieldType: 'radioGroup',
                                radioOptions: enableOptions,
                                layout: { xs: 12 },
                              })
                            }
                          </Grid>
                        </Collapse>
                      </Grid>
                    </Grid>
                    <Collapse in={formikProps.values.enabled} timeout={500} exit style={{ marginTop: '10px' }}>
                      <Accordion expanded={expanded === 'serialFields'} onChange={handleExpandChange('serialFields')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>
                            <FormattedMessage {...messages.serialFields} />
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid
                            container
                            spacing={2}
                            direction="row"
                          >
                            {serialFields.map((field) => (
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
                        </AccordionDetails>
                      </Accordion>
                      {
                        formikProps.values.autoPollEnabled && (
                        <Accordion expanded={expanded === 'autoPollFields'} onChange={handleExpandChange('autoPollFields')}>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>
                              <FormattedMessage {...messages.autoPollFields} />
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Grid
                              container
                              spacing={2}
                              direction="row"
                            >
                              {autoPollFields.map((field) => (
                                <Fragment key={field.propertyName}>
                                  {renderFields({
                                    value: formikProps.values[field.propertyName],
                                    name: `${field.propertyName}`,
                                    handleChange: formikProps.handleChange,
                                    layout: { xs: 12, md: 3 },
                                    ...field,
                                  })}
                                </Fragment>
                              ))}
                            </Grid>
                            <Grid
                              item
                              xs={12}
                            >
                              <AutoPollTable
                                rows={rows}
                                setRows={setRows}
                                setCommandsField={setCommandsField}
                              />
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                        )
                      }
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

export default Serial;
