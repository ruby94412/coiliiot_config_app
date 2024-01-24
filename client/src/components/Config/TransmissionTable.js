import {
  useState, useEffect,
} from 'react';
import {
  Grid, Box, FormControl, Chip, Checkbox,
  MenuItem, Select, FormLabel, ListItemText,
  FormHelperText, Collapse, Button, Snackbar, Alert,
} from '@mui/material';
import {
  Add as AddIcon,
} from '@mui/icons-material';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { FormattedMessage, useIntl } from 'react-intl';
import messages from 'hocs/Locale/Messages/Config/Platform';
import NoRowsOverlay from 'components/common/NoRowsOverlay';
import { getConversionTableColumns } from './constants';
import { getUid } from './utils';

const tableStyle = {
  boxShadow: 2,
  border: 2,
  borderColor: 'primary.dark',
  marginLeft: '5px',
  minHeight: '200px',
  '& .MuiInputBase-root': {
    height: '100%',
    fontSize: '13px',
  },
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function EditToolbar({
  setRows, setRowModesModel,
}) {
  const handleClick = () => {
    const id = getUid('simple');
    setRows((oldRows) => [...oldRows, {
      id,
      command: '',
      propertyName: '',
      address: 0,
      dataType: 0,
      order: 0,
      ratio: 1,
      deviation: 0,
      isNew: true,
    }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'propertyName' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" size="small" sx={{ py: 0 }} variant="contained" startIcon={<AddIcon />} onClick={handleClick}>
        <FormattedMessage {...messages.addRecordButton} />
      </Button>
    </GridToolbarContainer>
  );
}

function TransmissionTables({
  formikProps,
  dataType,
  cmdRows,
}) {
  const intl = useIntl();
  const [selected, setSelected] = useState([]);
  const [convRows, setConvRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [snackbar, setSnackbar] = useState(null);

  useEffect(() => {
    const formVals = formikProps.values;
    if (!formVals) return;
    if (dataType === 0) {
      const temp = [];
      formVals.commands.forEach((serialIdAndId) => {
        const idx = cmdRows?.findIndex((cmd) => (`${cmd.serialId}-${cmd.id}` === serialIdAndId));
        if (idx > -1) temp.push(cmdRows[idx]);
      });
      setSelected(temp);
      setConvRows([]);
    } else {
      setSelected([]);
      setConvRows(formVals.conversions);
    }
  }, [dataType, cmdRows]);

  const handleModbusCmdSelect = (event) => {
    setSelected(event.target.value);
    const fields = event.target.value.map((cmd) => (`${cmd.serialId}-${cmd.id}`));
    formikProps.setFieldValue('commands', fields);
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      // eslint-disable-next-line no-param-reassign
      event.defaultMuiPrevented = true;
    }
  };

  const isDup = (row) => {
    const idx = convRows.findIndex((cRow) => (cRow.propertyName === row.propertyName));
    if (idx < 0) return false;
    return convRows[idx].id !== row.id;
  };

  const validateRow = (row) => new Promise((res, rej) => {
    if (!row.command || row.command.trim() === '') {
      rej(new Error(intl.formatMessage(messages.emptyCmdErr)));
    } else if (!row.propertyName || row.propertyName.trim() === '') {
      rej(new Error(intl.formatMessage(messages.emptyPropErr)));
    } else if (isDup(row)) {
      rej(new Error(intl.formatMessage(messages.dupPropErr)));
    } else {
      res(row);
    }
  });

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    const fields = convRows.filter((row) => row.id !== id);
    setConvRows(fields);
    formikProps.setFieldValue('conversions', fields);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = convRows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setConvRows(convRows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    const res = validateRow(updatedRow);
    const updateRows = convRows.map((row) => (row.id === newRow.id ? updatedRow : row));
    const fields = updateRows.map((obj) => {
      // eslint-disable-next-line no-param-reassign
      delete obj.isNew;
      return obj;
    });
    formikProps.setFieldValue('conversions', fields);
    setConvRows(updateRows);
    return res;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleProcessRowUpdateError = (error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(null);
  };

  const convColumns = getConversionTableColumns({
    intl,
    handleCancelClick,
    handleDeleteClick,
    handleEditClick,
    handleSaveClick,
    rowModesModel,
    cmdRows,
  });

  return (
    <>
      <Grid item xs={dataType === 0 ? 6 : 12}>
        <Collapse in={dataType === 0}>
          <FormControl sx={{ display: 'flex' }}>
            <FormLabel><FormattedMessage {...messages.multiSelectLabel} /></FormLabel>
            <Select
              size="small"
              multiple
              value={selected}
              sx={{ width: '80%' }}
              onChange={handleModbusCmdSelect}
              MenuProps={MenuProps}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (<Chip key={value.id} label={value.tag} size="small" />))}
                </Box>
              )}
            >
              {
                cmdRows.map((option) => (
                  <MenuItem key={option.tag} value={option} sx={{ height: '25px' }}>
                    <Checkbox checked={selected.findIndex(
                      (val) => (val.id === option.id),
                    ) > -1}
                    />
                    <ListItemText primary={`${option.tag}-${option.cmdStr}`} />
                  </MenuItem>
                ))
              }
            </Select>
            <FormHelperText sx={{ ml: 0 }}>
              <FormattedMessage {...messages.multiSelectHelper} />
            </FormHelperText>
          </FormControl>
        </Collapse>
        <Collapse in={dataType === 1}>
          <DataGrid
            sx={tableStyle}
            rows={convRows}
            columns={convColumns}
            editMode="row"
            autoHeight
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={handleProcessRowUpdateError}
            rowHeight={30}
            columnHeaderHeight={30}
            slots={{
              toolbar: EditToolbar,
              noRowsOverlay: NoRowsOverlay,
            }}
            slotProps={{
              toolbar: { setRows: setConvRows, setRowModesModel },
            }}
            hideFooterSelectedRowCount
            hideFooter
            hideFooterPagination
          />
        </Collapse>
      </Grid>
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={3000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </>
  );
}

export default TransmissionTables;
