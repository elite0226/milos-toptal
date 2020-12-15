import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Button, Paper, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import { decimalFormat } from 'src/utils/number';

import useStyles from './style';

function RestaurantDetails() {
  const classes = useStyles();
  const { restaurantId } = useParams();

  const { restaurants } = useSelector(state => state.restaurant);

  const restaurant = React.useMemo(() => {
    return restaurants.find((item) => item.id === +restaurantId);
  }, [restaurants, restaurantId]);

  return (
    <>
      <Paper>
        <Box className={classes.details}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4">{restaurant.name}</Typography>
            <Button
              variant="contained"
              color="primary"
              disableElevation
            >
              Leave comment
            </Button>
          </Box>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Box display="flex" flexDirection="column">
              <Typography variant="h6">Average Rating</Typography>
              <Box display="flex" alignItems="center">
                <Rating className={classes.rating} value={3} precision={0.1} readOnly />
                <Typography variant="subtitle2">({decimalFormat(3, 2)})</Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography variant="h6">Highest Rating</Typography>
              <Box display="flex" alignItems="center">
                <Rating className={classes.rating} value={4.5} precision={0.1} readOnly />
                <Typography variant="subtitle2">({4.5})</Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography variant="h6">Lowest Rating</Typography>
              <Box display="flex" alignItems="center">
                <Rating className={classes.rating} value={2} precision={0.1} readOnly />
                <Typography variant="subtitle2">({2})</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </>
  );
}

export default RestaurantDetails;