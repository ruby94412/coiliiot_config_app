import { useState, useEffect } from 'react';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  Box,
  Grid,
  Select,
  FormControl,
  FormLabel,
  MenuItem,
  Collapse,
  List,
  ListItem,
  IconButton,
} from '@mui/material';
import {
  DeleteOutlined as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CancelIcon,
} from '@mui/icons-material';
import { MuiFileInput } from 'mui-file-input';
import { FormattedMessage } from 'react-intl';
import messages from 'hocs/Locale/Messages/Console/ConnectOperation';
import { TransitionGroup } from 'react-transition-group';
import ConnectOperation from './ConnectOperation';
import SerialMonitor from './SerialMonitor';

const addressOptions = [0x1000, 0x8000, 0x10000];
const getColumns = ({
  rowModesModel,
  handleSaveClick,
  handleCancelClick,
  handleEditClick,
  handleDeleteClick,
}) => [
  {
    field: 'address',
    headerName: 'Address',
    headerClassName: 'custom-height',
    minWidth: 150,
    renderCell: ({ id, value }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
      return isInEditMode ? (
        <Select size="small" sx={{ width: '100%' }}>
          {
            addressOptions.map((option) => (
              <MenuItem
                key={option}
                value={option}
              >
                {`0x${option.toString(16)}`}
              </MenuItem>
            ))
          }
        </Select>
      ) : (<span>{value ? value.toString(16) : ''}</span>);
    },
  },
  {
    field: 'file',
    headerName: 'File',
    minWidth: 300,
    headerClassName: 'custom-height',
    renderCell: ({ id, value }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
      return isInEditMode ? (
        <MuiFileInput size="small" />
      ) : (<span>asdfasdfasdf</span>);
    },
  },
  {
    field: 'actions',
    type: 'actions',
    headerClassName: 'custom-height',
    headerName: 'Actions',
    width: 100,
    cellClassName: 'actions',
    getActions: ({ id }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
      if (isInEditMode) {
        return [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            sx={{
              color: 'primary.main',
            }}
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={handleCancelClick(id)}
            color="inherit"
          />,
        ];
      }
      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ];
    },
  },
];
function FileSelect({
  fileArray,
  setFileArray,
  rowModesModel,
  setRowModesModel,
}) {
  useEffect(() => {
    console.log(fileArray);
  }, [fileArray]);
  const addressOptions = [0x1000, 0x8000, 0x10000];
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      // eslint-disable-next-line no-param-reassign
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setFileArray(fileArray.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = fileArray.find((row) => row.id === id);
    if (editedRow.isNew) {
      setFileArray(fileArray.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    console.log('call');
    const updatedRow = { ...newRow, isNew: false };
    setFileArray(fileArray.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleDelete = (idx) => () => {
    const temp = [...fileArray];
    temp.splice(idx, 1);
    setFileArray(temp);
  };

  const handleAddressChange = (idx) => (e) => {
    const temp = [...fileArray];
    temp[idx].address = e.target.value;
    setFileArray(temp);
  };

  const handleFileChange = (idx) => (e) => {
    const temp = [...fileArray];
    const reader = new FileReader();
    reader.onload = (ev) => {
      temp[idx].data = ev.target.result;
    };
    reader.readAsBinaryString(e);
    temp[idx].file = e;
    setFileArray(temp);
  };

  const columns = getColumns({
    rowModesModel,
    handleSaveClick,
    handleCancelClick,
    handleEditClick,
    handleDeleteClick,
  });
  return (
    <>
      <Grid container spacing={2} direction="row">
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid
            container
            spacing={2}
            direction="row"
            sx={{ width: '60%' }}
            justifyContent="flex-start"
          >
            <Grid item xs={12}>
              <DataGrid
                sx={{
                  boxShadow: 2,
                  border: 2,
                  borderColor: 'primary.dark',
                  '& .custom-height': {
                    minHeight: '45px',
                    maxHeight: '45px',
                    lineHeight: '45px',
                  },
                }}
                autoHeight
                rowHeight={80}
                rows={fileArray}
                columns={columns}
                editMode="row"
                disableColumnMenu
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                hideFooterSelectedRowCount
                hideFooter
                hideFooterPagination
              />
            </Grid>
            {/* <Grid item xs={6}>
              <FormLabel><FormattedMessage {...messages.portSelectLabel} /></FormLabel>
              <br />
              <TransitionGroup>
                {fileArray?.map((file, idx) => (
                  <Collapse key={`data${idx}`}>
                    <div style={{ display: 'flex' }}>
                      <MuiFileInput
                        size="small"
                        sx={{ minWidth: '300px', my: 1 }}
                        onChange={handleFileChange(idx)}
                        value={fileArray[idx].file}
                      />
                      <IconButton onClick={handleDelete(idx)}>
                        <DeleteIcon sx={{ '&:hover': { color: 'red' }, width: '45px' }} />
                      </IconButton>
                    </div>
                  </Collapse>
                ))}
              </TransitionGroup>
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default FileSelect;
