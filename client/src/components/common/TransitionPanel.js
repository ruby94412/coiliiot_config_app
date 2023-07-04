import { Children, isValidElement } from 'react';
import { Box, Collapse } from '@mui/material';

function TransitionPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  const childrenWithSlide = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return (
        <Collapse in={child.props.index === index} direction="up">
          {child}
        </Collapse>
      );
    }
    return child;
  });

  return (
    <Box {...other}>
      {childrenWithSlide}
    </Box>
  );
}

export default TransitionPanel;
