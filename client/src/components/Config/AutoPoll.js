import {
  useState, Fragment, useEffect, useRef, forwardRef, useImperativeHandle,
} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Grid, Collapse } from '@mui/material';
import TabPanel from 'components/common/TabPanel';
import { useIntl } from 'react-intl';
import { Formik } from 'formik';
// import SwipeableViews from 'react-swipeable-views';
import TransitionPanel from 'components/common/TransitionPanel';
import messages from 'hocs/Locale/Messages/Config/AutoPoll';
import TableToolBar from 'components/common/TableToolBar';
import NoRowsOverlay from 'components/common/NoRowsOverlay';
import CommandGenerator from './CommandGenerator';
import { renderFields, convertRawCommands, commandRowsToField } from './utils';
import { autoPollFields, getCommandTableColumns } from './constants';

const serialIdOptions = [
  { label: '1', value: 0 }, { label: '2', value: 1 }, { label: '3', value: 2 },
];

const AutoPoll = forwardRef(({
  initVals,
  networkForm,
}, ref) => {
  const intl = useIntl();
  const [params, setParams] = useState(null);
  const [networks, setNetworks] = useState([]);
  const [networkOptions, setNetworkOptions] = useState([]);
  const [serialId, setSerialId] = useState(0);
  const [rows, setRows] = useState([]);
  const formikRefs = useRef([]);

  useEffect(() => {
    if (networkForm?.form?.current?.length) {
      const temp = networkForm.form?.current
        .map((formikForm) => ({ ...formikForm.values }));
      setNetworks(temp);
    }
  }, [networkForm]);

  useEffect(() => {
    const temp = [];
    networks.forEach((network) => {
      if (network.enabled && Number(network.serialId) === serialId) {
        temp.push({ label: network.networkId + 1, value: network.networkId });
      }
    });
    setNetworkOptions(temp);
  }, [serialId, networks]);

  const enableOptions = [
    { label: intl.formatMessage(messages.autoPollOptionEnable), value: true },
    { label: intl.formatMessage(messages.autoPollOptionDisable), value: false },
  ];

  useEffect(() => {
    if (formikRefs.current[serialId].values.enabled) {
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

  const handleSerialIdChange = (event) => {
    setSerialId(Number(event.target.value));
  };

  const handleEnabledChange = (index) => (e) => {
    formikRefs.current[index].setFieldValue('enabled', e.target.value === 'true');
  };

  const columns = getCommandTableColumns({ intl, setParams, deleteRow });

  const renderToolBar = () => (
    <TableToolBar
      setModalOpen={() => {
        setParams({
          slaveId: 1,
          functionCode: 1,
          registerOffset: 0,
          numberOfRegisters: 1,
          enableJson: false,
          networkIds: [],
          propertyName: '',
          address: 0,
          dataType: 0,
          order: 0,
          ratio: 1,
          deviation: 0,
        });
      }}
      text={intl.formatMessage(messages.commandGeneratorButton)}
    />
  );

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
        {
          renderFields({
            label: intl.formatMessage(messages.serialIdLabel),
            value: serialId,
            handleChange: handleSerialIdChange,
            fieldType: 'radioGroup',
            radioOptions: serialIdOptions,
            layout: { xs: 12 },
          })
        }
      </Grid>
      <TransitionPanel index={serialId}>
        {
          initVals.map((serialConfig, index) => (
            <TabPanel key={index} index={index} value={serialId} sx={{ px: 0, py: 3 }}>
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
                      {renderFields({
                        label: intl.formatMessage(messages.autoPollLabel),
                        value: formikProps.values.enabled,
                        name: 'enabled',
                        handleChange: handleEnabledChange(index),
                        fieldType: 'radioGroup',
                        radioOptions: enableOptions,
                        layout: { xs: 12 },
                      })}
                    </Grid>
                    <Collapse in={formikProps.values.enabled} timeout={500} exit style={{ marginTop: '10px' }}>
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
                              layout: { xs: 12, md: 4 },
                              ...field,
                            })}
                          </Fragment>
                        ))}

                        <Grid item xs={12}>
                          <DataGrid
                            sx={{
                              boxShadow: 2,
                              border: 2,
                              borderColor: 'primary.dark',
                            }}
                            autoHeight
                            rowHeight={35}
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
                              networkOptions={networkOptions}
                            />
                          )}
                        </Grid>
                      </Grid>
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

export default AutoPoll;
