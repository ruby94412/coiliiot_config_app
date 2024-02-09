import { styled } from '@mui/material/styles';
import MuiCardContent from '@mui/material/CardContent';
import MuiCardActions from '@mui/material/CardActions';

export const CardContent = styled(MuiCardContent)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.mode === 'dark' && 'rgba(255, 255, 255, .03)',
}));

export const CardActions = styled(MuiCardActions)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.mode === 'dark' && 'rgba(255, 255, 255, .03)',
}));
