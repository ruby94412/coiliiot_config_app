import { useState } from 'react';
import {
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Bolt as FlashIcon,
  Delete as EraseIcon,
} from '@mui/icons-material';
import {
  GridRowModes,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';
import { FormattedMessage, useIntl } from 'react-intl';
import ConfirmDialog from 'components/common/ConfirmDialog';
import ErrorModal from 'components/common/ErrorModal';
import messages from 'hocs/Locale/Messages/Flash/Toolbar';
import CryptoJS from 'crypto-js';

function Toolbar({
  fileArray, setFileArray, setRowModesModel, espProps,
}) {
  const intl = useIntl();
  const [loadings, setLoadings] = useState({ erase: false, flash: false, add: false });
  const [errorMsg, setErrorMsg] = useState(null);
  const [snackbar, setSnackbar] = useState(null);
  const [isErasing, setIsErasing] = useState(false);
  const handleAddFile = () => {
    const id = Math.random().toString();
    setFileArray((oldRows) => [...oldRows, {
      id, address: '', data: '', file: null, status: 0, isNew: true,
    }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'address' },
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar(null);
  };

  const handleErase = async () => {
    setLoadings((pre) => ({ ...pre, erase: true }));
    try {
      await espProps.esploader.erase_flash();
      setSnackbar({
        children: <FormattedMessage {...messages.snackBarSuccess} />, severity: 'success',
      });
    } catch (e) {
      setErrorMsg(e.message);
      setSnackbar({
        children: <FormattedMessage {...messages.snackBarError} />, severity: 'error',
      });
    } finally {
      setTimeout(() => {
        setLoadings((pre) => ({ ...pre, erase: false }));
      }, 2000);
    }
  };

  const validateProgramInputs = (rows) => new Promise((res, rej) => {
    if (!rows.length) rej(intl.formatMessage(messages.emptyFileArray));
    const offsetArr = [];
    rows.forEach((row) => {
      if (!row.address || !row.data) rej(intl.formatMessage(messages.invalidInput));
      if (offsetArr.includes(row.address)) rej(intl.formatMessage(messages.duplicateAddresses));
      else offsetArr.push(row.address);
    });
    res(intl.formatMessage(messages.snackBarSuccess));
  });

  const handleFlash = async () => {
    fileArray?.forEach(({ id }) => {
      setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.View } }));
    });
    const temp = fileArray?.map((file) => ({ address: file.address, data: file.data }));
    try {
      await validateProgramInputs(temp);
      setLoadings((pre) => ({ ...pre, flash: true }));
      try {
        const flashOptions = {
          fileArray: temp,
          flashSize: 'keep',
          eraseAll: false,
          compress: true,
          reportProgress: (fileIndex, written, total) => {
            setFileArray((pre) => (pre.map(
              (row, idx) => (fileIndex === idx ? { ...row, status: (written / total) * 100 } : row),
            )));
          },
          calculateMD5Hash: (image) => CryptoJS.MD5(CryptoJS.enc.Latin1.parse(image)),
        };
        await espProps.esploader.write_flash(flashOptions);
        setSnackbar({
          children: <FormattedMessage {...messages.snackBarSuccess} />, severity: 'success',
        });
      } catch (e) {
        setErrorMsg(e.message);
        setSnackbar({
          children: <FormattedMessage {...messages.snackBarError} />, severity: 'error',
        });
      } finally {
        setTimeout(() => {
          setLoadings((pre) => ({ ...pre, flash: false }));
        }, 2000);
      }
    } catch (e) {
      setErrorMsg(e);
      setSnackbar({
        children: <FormattedMessage {...messages.snackBarError} />, severity: 'error',
      });
    }
  };
  return (
    <>
      <GridToolbarContainer>
        <LoadingButton startIcon={<AddIcon />} onClick={handleAddFile}>
          <FormattedMessage {...messages.addButton} />
        </LoadingButton>
        <LoadingButton
          startIcon={<FlashIcon />}
          onClick={handleFlash}
          loading={loadings.flash}
          disabled={!fileArray || fileArray.length === 0}
        >
          <FormattedMessage {...messages.flashButton} />
        </LoadingButton>
        <LoadingButton
          startIcon={<EraseIcon />}
          onClick={() => { setIsErasing(true); }}
          loading={loadings.erase}
        >
          <FormattedMessage {...messages.eraseButton} />
        </LoadingButton>
      </GridToolbarContainer>
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={2000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
      <ConfirmDialog
        isOpen={isErasing}
        onClose={() => { setIsErasing(false); }}
        handleConfirmCb={() => {
          setIsErasing(false);
          handleErase();
        }}
        content={<FormattedMessage {...messages.eraseConfirmText} />}
      />
      <ErrorModal
        errorMessage={errorMsg}
        onClose={() => { setErrorMsg(null); }}
        isErrorModalOpen={!!errorMsg}
      />
    </>
  );
}

export default Toolbar;
