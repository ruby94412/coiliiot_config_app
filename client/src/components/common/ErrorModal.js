import {Modal, Typography, Box} from '@mui/material';

const ErrorModal = ({
  errorMessage,
  isErrorModalOpen,
  onClose
}) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'white',
  };
  
  return (
    <Modal open={isErrorModalOpen} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          错误提示
        </Typography>
        <Typography sx={{mt: 2}}>
          {errorMessage}
        </Typography>
      </Box>
    </Modal>
  )
};

export default ErrorModal;