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
  networkOptions,
}) {
  const intl = useIntl();
  const handleClose = () => setParams(null);
  const [data, setData] = useState(params);
  const [command, setCommand] = useState(null);
  const [expanded, setExpanded] = useState('commandDetail');

  const enableOptions = [
    { label: intl.formatMessage(messages.enable), value: true },
    { label: intl.formatMessage(messages.disable), value: false },
  ];

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

  const handleNetworkSelect = (e) => {
    const id = Number(e.target.name);
    const networkIds = [...data.networkIds];
    if (networkIds.includes(id)) networkIds.splice(networkIds.indexOf(id));
    else networkIds.push(id);
    networkIds.sort((a, b) => (a - b));
    const updatedData = { ...data };
    updatedData.networkIds = networkIds;
    setData(updatedData);
  };

  const handleConfirm = () => {
    let temp;
    if (params?.id) {
      temp = rows.map((obj) => (obj.id === data.id ? { ...data, detail: command } : obj));
      setRows(temp);
    } else {
      temp = [...rows];
      temp.push({ ...data, id: getUid(), detail: command });
      setRows(temp);
    }
    setCommandsField(temp);
    handleClose();
  };

  const handleEnableJsonChange = (e) => {
    const updatedData = { ...data };
    updatedData.enableJson = (e.target.value === 'true');
    setData(updatedData);
    setExpanded(e.target.value === 'true' ? 'jsonFields' : 'commandDetail');
  };

  const handleExpandChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Dialog
      open={!!params}
      onClose={handleClose}
      PaperProps={{ style: dialogStyle }}
    >
      <DialogTitle><FormattedMessage {...messages.title} /></DialogTitle>
      <DialogContent dividers>
        <Accordion expanded={expanded === 'commandDetail'} onChange={handleExpandChange('commandDetail')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <FormattedMessage {...messages.commandDetail} />
          </AccordionSummary>
          <AccordionDetails>
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
          </AccordionDetails>
        </Accordion>
        <Grid
          container
          spacing={2}
          direction="row"
          sx={{ my: 1 }}
        >
          {renderFields({
            label: intl.formatMessage(messages.enableJson),
            value: data?.enableJson,
            name: 'enableJson',
            handleChange: handleEnableJsonChange,
            fieldType: 'radioGroup',
            radioOptions: enableOptions,
            layout: { xs: 12 },
          })}
        </Grid>
        <Collapse in={data.enableJson}>
          <Accordion expanded={expanded === 'jsonFields'} onChange={handleExpandChange('jsonFields')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <FormattedMessage {...messages.convertDetail} />
            </AccordionSummary>
            <AccordionDetails>
              <Grid
                container
                spacing={2}
                direction="row"
              >
                <Grid item xs={12}>
                  <FormControl sx={{ display: 'flex' }}>
                    <FormLabel component="legend"><FormattedMessage {...messages.networkIdLabel} /></FormLabel>
                    <FormGroup row>
                      {
                        networkOptions?.map((option) => (
                          <FormControlLabel
                            control={(
                              <Checkbox
                                checked={data?.networkIds?.includes(option.value)}
                                onChange={handleNetworkSelect}
                                name={option.value}
                              />
                            )}
                            label={option.label}
                            key={option.label}
                          />
                        ))
                      }
                    </FormGroup>
                  </FormControl>
                </Grid>
                {dataMappingFields.map((field) => (
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
            </AccordionDetails>
          </Accordion>
        </Collapse>
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
