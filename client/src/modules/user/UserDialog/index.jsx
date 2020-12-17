import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { useFormik } from 'formik';

import validationSchema from './schema';
import { updateUser, createUser } from 'src/store/actions/user';
import { InputField } from 'src/components';

const ROLES = [
  { label: 'Regular User', value: 'regular user' },
  { label: 'Restaurant Owner', value: 'owner' },
];

const UserDialog = ({ open, userId, onClose, fetch }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleSubmit = async (values) => {
    console.log('sumbitted', values);
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      role: values.role,
    };
    if (values.password) {
      data.password = values.password;
    }

    if (userId === 'new') {
      await dispatch(createUser(data));
      onClose();
      fetch();
    } else {
      console.log(userId, data);
      await dispatch(updateUser(userId, data));
      onClose();
    }
  };

  const formik = useFormik({
    initialValues: {
      userId,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      role: user.role || '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <Dialog onClose={onClose} aria-labelledby="user-dialog" open={open}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle disableTypography>
          <Typography variant="h4">
            {userId === 'new' ? 'CREATE A USER' : 'UPDATE A USER'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="space-between">
            <Box width="48%">
              <InputField
                formik={formik}
                name="firstName"
                label="First Name"
              />
            </Box>
            <Box width="48%">
              <InputField
                formik={formik}
                name="lastName"
                label="Last Name"
              />
            </Box>
          </Box>
          <InputField
            formik={formik}
            type="email"
            name="email"
            label="Email"
          />
          <InputField
            formik={formik}
            type="select"
            name="role"
            label="User Role"
            options={ROLES}
          />
          <Box display="flex" justifyContent="space-between">
            <Box width="48%">
              <InputField
                formik={formik}
                type="password"
                name="password"
                label="Password"
              />
            </Box>
            <Box width="48%">
              <InputField
                formik={formik}
                type="password"
                name="confirmPassword"
                label="Confirm Password"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>CANCEL</Button>
          <Button type="submit" variant="contained" color="primary">
            {userId === 'new' ? 'CREATE' : 'UPDATE'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserDialog;
