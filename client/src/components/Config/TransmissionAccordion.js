import { useState, useEffect } from 'react';
import {
  Grid, Collapse, InputAdornment, Box, Button, FormHelperText,
} from '@mui/material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from 'components/common/StyledAccordion';
import { DataGrid } from '@mui/x-data-grid';
import messages from 'hocs/Locale/Messages/Config/Platform';
import constMsg from 'hocs/Locale/Messages/Config/constants';
import { FormattedMessage, useIntl } from 'react-intl';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import NoRowsOverlay from 'components/common/NoRowsOverlay';
import ConfirmDialog from 'components/common/ConfirmDialog';
import { renderFields, convertRawCommands } from './utils';
import { getCommandInfoTableColumns } from './constants';
import TransmissionTables from './TransmissionTable';

const tableStyle = {
  boxShadow: 2,
  border: 2,
  borderColor: 'primary.light',
  color: 'white',
  minHeight: '100px',
};

function CommandInfoTable({
  cmdRows,
}) {
  const intl = useIntl();
  const infoColumns = getCommandInfoTableColumns({ intl });
  return (
    <DataGrid
      sx={tableStyle}
      autoHeight
      columnHeaderHeight={30}
      rowHeight={30}
      rows={cmdRows}
      columns={infoColumns}
      slots={{ noRowsOverlay: NoRowsOverlay }}
      hideFooterSelectedRowCount
      hideFooter
      hideFooterPagination
    />
  );
}

function TransmissionAccordion({
  expanded,
  serialId,
  serialForm,
  formikProps,
  handleExpandChange,
}) {
  const [cmdRows, setCmdRows] = useState([]);
  const [infoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    if (serialForm?.form?.current?.length) {
      const temp = serialForm.form?.current
        .map((formikForm) => ({ ...formikForm.values }));
      setCmdRows(convertRawCommands(temp[serialId]) || []);
    }
  }, [serialForm, serialId]);

  const handleInfoOpen = (event) => {
    event.stopPropagation();
    setInfoOpen(true);
  };

  const transmissionDataTypeOptions = [
    { label: <FormattedMessage {...messages.transmissionDataTypeOptionModbus} />, value: 0 },
    { label: <FormattedMessage {...messages.transmissionDataTypeOptionJson} />, value: 1 },
  ];

  const transmissionTypeOptions = [
    { label: <FormattedMessage {...messages.transmissionTypeOptionChange} />, value: 0 },
    { label: <FormattedMessage {...messages.transmissionTypeOptionPeriod} />, value: 1 },
  ];

  const handleTransmissionTypeChange = (e) => {
    formikProps.setFieldValue('transmissionType', Number(e.target.value));
  };

  const handleTransmissionDataTypeChange = (e) => {
    const temp = [...formikProps.values.transmissionDataType];
    temp[serialId] = Number(e.target.value);
    formikProps.setFieldValue('transmissionDataType', temp);
  };
  return (
    <Accordion
      expanded={expanded === 'dataTransmissionFields'}
      onChange={handleExpandChange('dataTransmissionFields')}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <FormattedMessage {...messages.dataTransmissionFields} />
        <Box flexGrow={1} />
        <Button variant="contained" sx={{ py: 0 }} size="small" onClick={handleInfoOpen}>
          <FormattedMessage {...messages.detailButton} />
        </Button>
      </AccordionSummary>
      <AccordionDetails>
        <Grid
          container
          spacing={2}
          direction="row"
        >
          {
            renderFields({
              label: <FormattedMessage {...messages.transmissionDataTypeLabel} />,
              value: formikProps.values.transmissionDataType[serialId],
              name: 'transmissionDataType',
              handleChange: handleTransmissionDataTypeChange,
              fieldType: 'radioGroup',
              radioOptions: transmissionDataTypeOptions,
              layout: { xs: 4 },
              helperTooltip: (
                formikProps.values.transmissionDataType === 0
                  ? <FormattedMessage {...messages.dataTypeHelperModbus} />
                  : <FormattedMessage {...messages.dataTypeHelperJson} />
              ),
            })
          }
          {
            renderFields({
              label: <FormattedMessage
                {...messages.transmissionTypeLabel}
              />,
              value: formikProps.values.transmissionType,
              name: 'transmissionType',
              handleChange: handleTransmissionTypeChange,
              fieldType: 'radioGroup',
              radioOptions: transmissionTypeOptions,
              layout: { xs: 5 },
            })
          }
          <Grid item xs={3}>
            <Collapse
              in={formikProps.values.transmissionType > 0}
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
                    {...messages.transmissionPeriodLabel}
                  />,
                  name: 'transmissionPeriod',
                  value: formikProps.values.transmissionPeriod,
                  handleChange: formikProps.handleChange,
                  layout: { xs: 12 },
                  style: { width: '100%' },
                  datatype: 'number',
                  endAdornment: <InputAdornment position="end"><FormattedMessage {...constMsg.second} /></InputAdornment>,
                })}
              </Grid>
            </Collapse>
          </Grid>
          {/* <TransmissionTables
            formikProps={formikProps}
            serialId={serialId}
            cmdRows={cmdRows}
            dataType={formikProps.values.transmissionDataType[serialId]}
          /> */}
          <ConfirmDialog
            isOpen={infoOpen}
            onClose={() => { setInfoOpen(false); }}
            content={<CommandInfoTable cmdRows={cmdRows} />}
            renderOtherContent={() => (
              <FormHelperText sx={{ color: 'white' }}>
                <FormattedMessage {...messages.dataSourceHelper} />
              </FormHelperText>
            )}
            width="800px"
            title={<FormattedMessage {...messages.dataSourceTitle} />}
            disableConfirm
          />
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export default TransmissionAccordion;