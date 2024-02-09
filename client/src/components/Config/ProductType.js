import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';
import { readLocalData, writeLocalData } from 'slice/data';
import { FormattedMessage } from 'react-intl';
import messages from 'hocs/Locale/Messages/Config/ProductType';
import Test from 'img/blue_logo.png';
import Metal from 'img/metal.png';
import Plastic from 'img/plastic.png';

const getBoxStyle = (origin, selected) => (selected ? {
  ...origin, border: 2, borderColor: 'primary.main', borderRadius: 2,
} : origin);

const renderCard = ({
  title,
  img,
  description,
  id,
  selected,
  handleClick,
}) => (
  <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', mb: 3 }} key={id}>
    <Card sx={getBoxStyle({ maxWidth: '80%' }, selected === id)}>
      <CardActionArea onClick={handleClick(id)}>
        <CardMedia
          component="img"
          image={img}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
);

const cardInfo = [
  {
    title: '4G DTU',
    img: Test,
    description: `Lizards are a widespread group of squamate reptiles, with over 6,000
    species, ranging across all continents except Antarctica`,
    id: 0,
  },
  {
    title: <FormattedMessage {...messages.espDTUTitle} />,
    img: Metal,
    description: `Lizards are a widespread group of squamate reptiles, with over 6,000
    species, ranging across all continents except Antarctica`,
    id: 1,
  },
  {
    title: <FormattedMessage {...messages.espIOTitle} />,
    img: Plastic,
    description: `Lizards are a widespread group of squamate reptiles, with over 6,000
    species, ranging across all continents except Antarctica`,
    id: 2,
  },
];

function ProductType({
  appSetting,
  readLocalData,
  writeLocalData,
}) {
  const [selected, setSelected] = useState();
  useEffect(() => {
    readLocalData({ fileName: 'appSetting' });
  }, []);
  const handleClick = (id) => () => {
    setSelected(id);
    writeLocalData({ data: { ...appSetting, productType: id }, fileName: 'appSetting' });
  };
  useEffect(() => {
    setSelected(appSetting?.productType);
  }, [appSetting]);
  return (
    <Grid container spacing={2} direction="row">
      {cardInfo.map((info) => renderCard({ ...info, handleClick, selected }))}
    </Grid>
  );
}

const mapStateToProps = (state) => ({ appSetting: state.credentialAndConfig.appSetting });

export default connect(mapStateToProps, { readLocalData, writeLocalData })(ProductType);
