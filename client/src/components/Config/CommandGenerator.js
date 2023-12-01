import { Fragment, useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  Collapse,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox,
} from '@mui/material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from 'components/common/StyledAccordion';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { FormattedMessage, useIntl } from 'react-intl';
import messages from 'hocs/Locale/Messages/Config/CommandGenerator';
import CommandDetail from './CommandDetail';
import { getCommandDetail, renderFields, getUid } from './utils';
import { commandGeneratorFields, dataMappingFields } from './constants';

const dialogStyle = {
  backgroundColor: 'secondary.main',
  minWidth: '40%',
  minHeight: '80%',
};

function CommandGenerator({
  rows,
  setRows,
  params,
  setParams,
  setCommandsField,
}) {
  const handleClose = () => setParams(null);
  const [data, setData] = useState(params);
  const [command, setCommand] = useState(null);

  useEffect(() => {
    setData(params);
  }, [params]);

  useEffect(() => {
    setCommand(getCommandDetail(data));
  }, [data]);

  const handleDataChange = (propertyName) => (e) => {
    const updatedData = { ...data };
    updatedData[propertyName] = e.target.value;
    setData(updatedData);
  };

  const handleConfirm = () => {
    let temp;
    if (params?.id) {
      temp = rows.map((obj) => (obj.id === data.id ? { ...data, detail: command } : obj));
      setRows(temp);
    } else {
      temp = [...rows];
      temp.push({ ...data, id: getUid('simple'), detail: command });
      setRows(temp);
    }
    setCommandsField(temp);
    handleClose();
  };

  return (
    <Dialog
      open={!!params}
      onClose={handleClose}
      PaperProps={{ style: dialogStyle }}
    >
      <DialogTitle><FormattedMessage {...messages.title} /></DialogTitle>
      <DialogContent dividers>
        <Grid
          container
          spacing={2}
          direction="row"
        >
          {commandGeneratorFields.map((field) => (
            <Fragment key={field.propertyName}>
              {renderFields({
                name: field.propertyName,
                value: data[field.propertyName],
                handleChange: handleDataChange(field.propertyName),
                layout: { xs: 12, md: 6 },
                ...field,
              })}
            </Fragment>
          ))}
        </Grid>
        {
          command
          && <Grid item xs={12} pt={4}><CommandDetail command={command} /></Grid>
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          <FormattedMessage {...messages.cancel} />
        </Button>
        <Button onClick={handleConfirm} variant="contained">
          <FormattedMessage {...messages.confirm} />
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CommandGenerator;
