import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { useFormik } from 'formik';

import { InputField } from 'src/components';
import { createRestaurant, updateRestaurant } from 'src/store/actions/restaurant';
import { getUsers } from 'src/store/actions/user';
import ROLES from 'src/constants';

import validationSchema from './schema';

function RestaurantDialog({ open, restaurantId, onClose, fetch }) {
  const dispatch = useDispatch();
  const { restaurant } = useSelector((state) => state.restaurant);
  const { users } = useSelector((state) => state.user);
  const { profile } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (profile.role === ROLES.ADMIN) {
      dispatch(getUsers());
    }
  }, [dispatch, profile]);

  const handleSubmit = async (values) => {
    if (restaurantId === 'new') {
      await dispatch(createRestaurant(values));
      onClose();
      fetch();
    } else {
      await dispatch(updateRestaurant(restaurantId, values));
      onClose();
    }
  };

  const formik = useFormik({
    initialValues: {
      ownerId: restaurant?.owner?.id || profile.id,
      name: restaurant?.name || '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <>
      <Dialog open={open} onClose={onClose} aria-labelledby="restaurant-dialog">
        <form onSubmit={formik.handleSubmit} style={{ width: 500 }}>
          <DialogTitle disableTypography>
            <Typography variant="h6">
              {restaurantId === 'new' ? 'CREATE A NEW RESTAURANT' : 'UPDATE A RESTAURANT'}
            </Typography>
          </DialogTitle>
          <DialogContent>
            {profile.role === ROLES.ADMIN && (
              <InputField
                formik={formik}
                type="select"
                name="ownerId"
                label="Restaurant Owner"
                placeholder="Restaurant Owner"
                options={users
                  .filter((user) => user.role === ROLES.OWNER)
                  .map((user) => ({ label: `${user.firstName} ${user.lastName}`, value: user.id }))
                }
              />
            )}
            <InputField
              formik={formik}
              name="name"
              label="Restaurant Name"
              placeholder="Restaurant Name"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>CANCEL</Button>
            <Button type="submit" variant="contained" color="primary" disableElevation>
              {restaurantId === 'new' ? 'CREATE' : 'UPDATE'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default RestaurantDialog;
