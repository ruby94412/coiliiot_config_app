import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.flash.updateFirmware';

export default defineMessages({
  autoHeader: {
    id: `${scope}.autoHeader`,
    defaultMessage: 'Update Firmware',
  },
  latestVersionLabel: {
    id: `${scope}.latestVersionLabel`,
    defaultMessage: 'The Latest Firmware Version',
  },
  learnMore: {
    id: `${scope}.learnMore`,
    defaultMessage: 'Learn More',
  },
  download: {
    id: `${scope}.download`,
    defaultMessage: 'Download',
  },
  downloadAndInstall: {
    id: `${scope}.downloadAndInstall`,
    defaultMessage: 'Download And Install',
  },
  upToDate: {
    id: `${scope}.upToDate`,
    defaultMessage: 'The Device Is Up To Date',
  },
  install: {
    id: `${scope}.install`,
    defaultMessage: 'Install',
  },
  downloaded: {
    id: `${scope}.downloaded`,
    defaultMessage: 'Downloaded',
  },
  currentVersion: {
    id: `${scope}.currentVersion`,
    defaultMessage: 'Current version',
  },
  snackBarSuccess: {
    id: `${scope}.snackBarSuccess`,
    defaultMessage: 'Data Updated',
  },
  snackBarError: {
    id: `${scope}.snackBarError`,
    defaultMessage: 'Update Error',
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
