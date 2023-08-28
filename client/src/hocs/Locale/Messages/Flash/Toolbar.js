import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.flash.toolbar';

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
  eraseConfirmText: {
    id: `${scope}.eraseConfirmText`,
    defaultMessage: 'Please Confirm To Erase Firmware On The Device',
  },
  snackBarSuccess: {
    id: `${scope}.snackBarSuccess`,
    defaultMessage: 'Operation Success',
  },
  snackBarError: {
    id: `${scope}.snackBarError`,
    defaultMessage: 'Operation Error',
  },
  emptyFileArray: {
    id: `${scope}.emptyFileArray`,
    defaultMessage: 'Files to be flashed are empty',
  },
  invalidInput: {
    id: `${scope}.invalidInput`,
    defaultMessage: 'Input is invalid',
  },
  duplicateAddresses: {
    id: `${scope}.duplicateAddresses`,
    defaultMessage: 'Duplicate addresses',
  },
});
