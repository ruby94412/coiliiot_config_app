import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.navigation.settingDrawer';

export default defineMessages({
  settingTitle: {
    id: `${scope}.settingTitle`,
    defaultMessage: 'Settings',
  },
  modeTitle: {
    id: `${scope}.modeTitle`,
    defaultMessage: 'Mode',
  },
  modeLight: {
    id: `${scope}.modeLight`,
    defaultMessage: 'Light',
  },
  modeDark: {
    id: `${scope}.modeDark`,
    defaultMessage: 'Dark',
  },
  languageTitle: {
    id: `${scope}.languageTitle`,
    defaultMessage: 'Language',
  },
  versionTitle: {
    id: `${scope}.versionTitle`,
    defaultMessage: 'Version',
  },
  enableUpdateButton: {
    id: `${scope}.enableUpdate`,
    defaultMessage: 'Update After Relaunch',
  },
  upToDateText: {
    id: `${scope}.upToDateText`,
    defaultMessage: 'Current Version Is Up To Date',
  },
  updateReminderText: {
    id: `${scope}.updateReminderText`,
    defaultMessage: 'New Version Availble',
  },
  updateConfirmedText: {
    id: `${scope}.updateConfirmedText`,
    defaultMessage: 'Update Will Be Applied Before Next Launch',
  },
  downloadUpdate: {
    id: `${scope}.downloadUpdate`,
    defaultMessage: 'Download',
  },
  downloaded: {
    id: `${scope}.downloaded`,
    defaultMessage: 'Downloaded',
  },
});
