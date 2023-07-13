import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { FormattedMessage } from 'react-intl';
import messages from 'hocs/Locale/Messages/common/ErrorModal';
import otherMessages from 'hocs/Locale/Messages/common/ConfirmDialog';

function ErrorModal({
  errorMessage,
  isErrorModalOpen,
  onClose,
}) {
  return (
    <Dialog
      maxWidth="xs"
      open={isErrorModalOpen}
      onClose={onClose}
      PaperProps={{
        style: {
          backgroundColor: '#424141',
          color: 'white',
          minWidth: '350px',
        },
      }}
    >
      <DialogTitle><FormattedMessage {...messages.typography} /></DialogTitle>
      <DialogContent dividers>
        {errorMessage}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          <FormattedMessage {...otherMessages.confirmButton} />
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ErrorModal;
