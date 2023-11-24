import {
  useState, Fragment, useRef, forwardRef, useImperativeHandle, useEffect,
} from 'react';
import { Grid, Collapse } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import TransitionPanel from 'components/common/TransitionPanel';
import TabPanel from 'components/common/TabPanel';
import { FormattedMessage, useIntl } from 'react-intl';
import messages from 'hocs/Locale/Messages/Config/Serial';
import TableToolBar from 'components/common/TableToolBar';
import NoRowsOverlay from 'components/common/NoRowsOverlay';
import { Formik } from 'formik';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from 'components/common/StyledAccordion';
import CommandGenerator from './CommandGenerator';
import { serialFields, autoPollFields, getCommandTableColumns } from './constants';
import { renderFields, convertRawCommands, commandRowsToField } from './utils';

const Serial = forwardRef(({
  initVals,
}, ref) => {
  const intl = useIntl();
  const [serialId, setSerialId] = useState(0);
  const [params, setParams] = useState(null);
  const [expanded, setExpanded] = useState('serialFields');
  const [rows, setRows] = useState([]);
  const serialIdOptions = [
    { label: '1', value: 0 }, { label: '2', value: 1 }, { label: '3', value: 2 },
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

  useImperativeHandle(ref, () => ({
    form: formikRefs,
  }));

  const handleExpandChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleAutoPollEnabledChange = (index) => (e) => {
    const enabled = e.target.value === 'true';
    setExpanded(enabled ? 'autoPollFields' : 'serialFields');
    formikRefs.current[index].setFieldValue('autoPollEnabled', enabled);
  };

  useEffect(() => {
    if (formikRefs.current[serialId].values.autoPollEnabled) {
      setRows(convertRawCommands(formikRefs.current[serialId].values));
    } else {
      setRows([]);
    }
  }, [serialId, initVals]);

  const setCommandsField = (tempRows) => {
    const commands = commandRowsToField(tempRows);
    formikRefs.current[serialId].setFieldValue('commands', commands);
  };

  const deleteRow = (row) => {
    const temp = [...rows];
    temp.splice(temp.findIndex((obj) => obj.id === row.id), 1);
    setRows(temp);
    setCommandsField(temp);
  };

  const renderToolBar = () => (
    <TableToolBar
      setModalOpen={() => {
        setParams({
          slaveId: 1,
          functionCode: 1,
          registerOffset: 0,
          numberOfRegisters: 1,
          tag: '',
        });
      }}
      text={intl.formatMessage(messages.commandGeneratorButton)}
    />
  );

  const columns = getCommandTableColumns({ intl, setParams, deleteRow });
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
                          <FormattedMessage {...messages.serialFields} />
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
                      <Collapse in={formikProps.values.autoPollEnabled} timeout={500} exit>
                        <Accordion expanded={expanded === 'autoPollFields'} onChange={handleExpandChange('autoPollFields')}>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <FormattedMessage {...messages.autoPollFields} />
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
                              <DataGrid
                                sx={{
                                  marginTop: '15px',
                                  boxShadow: 2,
                                  border: 2,
                                  borderColor: 'primary.dark',
                                }}
                                autoHeight
                                columnHeaderHeight={30}
                                rowHeight={30}
                                rows={rows}
                                columns={columns}
                                slots={{
                                  toolbar: renderToolBar,
                                  noRowsOverlay: NoRowsOverlay,
                                }}
                                hideFooterSelectedRowCount
                                hideFooter
                                hideFooterPagination
                              />
                              {params && (
                                <CommandGenerator
                                  rows={rows}
                                  setRows={setRows}
                                  params={params}
                                  setParams={setParams}
                                  setCommandsField={setCommandsField}
                                />
                              )}
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                      </Collapse>
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
