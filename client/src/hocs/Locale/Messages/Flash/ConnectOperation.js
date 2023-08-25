import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.flash.connectOperation';

export default defineMessages({
  eraseButton: {
    id: `${scope}.eraseButton`,
    defaultMessage: 'Erase Flash',
  },
  addButton: {
    id: `${scope}.addButton`,
    defaultMessage: 'Add File',
  },
  flashButton: {
    id: `${scope}.flashButton`,
    defaultMessage: 'Flash Program',
  },
  snackBarSuccess: {
    id: `${scope}.snackBarSuccess`,
    defaultMessage: 'Operation Success',
  },
  snackBarError: {
    id: `${scope}.snackBarError`,
    defaultMessage: 'Operation Error',
  },
});
