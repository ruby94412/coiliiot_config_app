import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  Box,
  Grid,
  Select,
  MenuItem,
  LinearProgress,
  Typography,
} from '@mui/material';
import {
  DeleteOutlined as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CancelIcon,
} from '@mui/icons-material';
import { MuiFileInput } from 'mui-file-input';
import { useIntl } from 'react-intl';
import NoRowsOverlay from 'components/common/NoRowsOverlay';
import messages from 'hocs/Locale/Messages/Flash/FileTable';
import Toolbar from './Toolbar';

const addressOptions = [0x1000, 0x8000, 0x10000];
const formatDataSize = (size) => {
  let sizeInBytes = size;
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let unitIndex = 0;

  while (sizeInBytes >= 1024 && unitIndex < units.length - 1) {
    sizeInBytes /= 1024;
    unitIndex++;
  }

  return `${Math.round(sizeInBytes * 100) / 100} ${units[unitIndex]}`;
};

const getColumns = ({
  intl,
  rowModesModel,
  handleSaveClick,
  handleCancelClick,
  handleEditClick,
  handleDeleteClick,
  handleAddressChange,
  handleFileChange,
}) => [
  {
    field: 'address',
    headerName: intl.formatMessage(messages.addressHeader),
    headerClassName: 'custom-height',
    minWidth: 150,
    renderCell: (params) => {
      const { id, value } = params;
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
      return isInEditMode ? (
        <Select
          size="small"
          sx={{ width: '100%' }}
          value={value}
          onChange={handleAddressChange(id)}
        >
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
      ) : (<span>{value ? `0x${value.toString(16)}` : ''}</span>);
    },
  },
  {
    field: 'file',
    headerName: intl.formatMessage(messages.fileHeader),
    minWidth: 300,
    headerClassName: 'custom-height',
    renderCell: ({ id, value }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
      return isInEditMode ? (
        <MuiFileInput size="small" value={value} onChange={handleFileChange(id)} />
      ) : (
        <>
          { value && (
            <>
              <span>{`${value?.name} \u00A0 \u00A0 \u00A0`}</span>
              <span style={{ fontSize: '12px' }}>{formatDataSize(value?.size)}</span>
            </>
          )}
        </>
      );
    },
  },
  {
    field: 'status',
    headerName: intl.formatMessage(messages.statusHeader),
    minWidth: 180,
    headerClassName: 'custom-height',
    renderCell: ({ value }) => (
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" value={value} color="primary" />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="caption">
            {`${Math.round(value)}%`}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    field: 'actions',
    type: 'actions',
    headerClassName: 'custom-height',
    headerName: intl.formatMessage(messages.actionHeader),
    width: 80,
    cellClassName: 'actions',
    getActions: ({ id }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
      if (isInEditMode) {
        return [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            sx={{ color: 'primary.main' }}
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            onClick={handleCancelClick(id)}
            sx={{ color: 'primary.main' }}
            color="inherit"
          />,
        ];
      }
      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={handleEditClick(id)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
        />,
      ];
    },
  },
];
function FileSelect({
  espProps,
  fileArray,
  setFileArray,
  rowModesModel,
  setRowModesModel,
}) {
  const intl = useIntl();
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
    const updatedRow = { ...newRow, isNew: false };
    setFileArray(fileArray.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleAddressChange = (id) => (e) => {
    setFileArray(fileArray.map(
      (row) => (row.id === id ? { ...row, address: e.target.value } : row),
    ));
  };

  const handleFileChange = (id) => (e) => {
    if (!e) {
      setFileArray(fileArray.map(
        (row) => (row.id === id ? { ...row, data: '', file: null } : row),
      ));
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const data = ev.target.result;
      setFileArray(fileArray.map(
        (row) => (row.id === id ? { ...row, data, file: e } : row),
      ));
    };
    reader.readAsBinaryString(e);
  };

  const columns = getColumns({
    intl,
    rowModesModel,
    handleSaveClick,
    handleCancelClick,
    handleEditClick,
    handleDeleteClick,
    handleAddressChange,
    handleFileChange,
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
                rowHeight={45}
                rows={fileArray}
                columns={columns}
                editMode="row"
                disableColumnMenu
                slots={{
                  toolbar: Toolbar,
                  noRowsOverlay: NoRowsOverlay,
                }}
                slotProps={{
                  toolbar: {
                    setFileArray, setRowModesModel, espProps, rowModesModel, fileArray,
                  },
                }}
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                hideFooterSelectedRowCount
                hideFooter
                hideFooterPagination
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default FileSelect;
