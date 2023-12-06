import {
  useState,
} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useIntl } from 'react-intl';
import messages from 'hocs/Locale/Messages/Config/Serial';
import TableToolBar from 'components/common/TableToolBar';
import NoRowsOverlay from 'components/common/NoRowsOverlay';
import CommandGenerator from './CommandGenerator';
import { getCommandTableColumns } from './constants';

function AutoPollTable({
  rows,
  setRows,
  setCommandsField,
}) {
  const intl = useIntl();
  const [params, setParams] = useState(null);
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

  const deleteRow = (row) => {
    const temp = [...rows];
    temp.splice(temp.findIndex((obj) => obj.id === row.id), 1);
    setRows(temp);
    setCommandsField(temp);
  };
  const columns = getCommandTableColumns({ intl, setParams, deleteRow });

  return (
    <>
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
    </>
  );
}

export default AutoPollTable;
