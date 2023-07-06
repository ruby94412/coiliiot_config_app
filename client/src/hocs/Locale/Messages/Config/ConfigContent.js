import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.config.configContent';

export default defineMessages({
  snackBarSuccess: {
    id: `${scope}.snackBarSuccess`,
    defaultMessage: 'Data Updated',
  },
  snackBarError: {
    id: `${scope}.snackBarError`,
    defaultMessage: 'Update Error',
  },
  credentialTabLabel: {
    id: `${scope}.credentialTabLabel`,
    defaultMessage: 'Credential',
  },
  basicTabLabel: {
    id: `${scope}.basicTabLabel`,
    defaultMessage: 'Basic',
  },
  serialTabLabel: {
    id: `${scope}.serialTabLabel`,
    defaultMessage: 'Serial',
  },
  networkTabLabel: {
    id: `${scope}.networkTabLabel`,
    defaultMessage: 'Network',
  },
  autoPollLabel: {
    id: `${scope}.autoPollLabel`,
    defaultMessage: 'Data Auto Polling',
  },
  dataConvertLabel: {
    id: `${scope}.dataConvertLabel`,
    defaultMessage: 'Converting Data',
  },
  cancelButton: {
    id: `${scope}.cancelButton`,
    defaultMessage: 'Cancel',
  },
  resetButton: {
    id: `${scope}.resetButton`,
    defaultMessage: 'Reset',
  },
  submitButton: {
    id: `${scope}.submitButton`,
    defaultMessage: 'Submit',
  },
  unsavedConfirm: {
    id: `${scope}.unsavedConfirm`,
    defaultMessage: 'Confirguration Unsaved, Please Confirm To Close This Window',
  },
});
