import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Link,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useFormik } from 'formik';

import { InputField } from 'src/components';
import { signup } from 'src/store/actions/auth';
import { requestRejected } from 'src/utils/api';
import { SIGNUP_REQUEST } from 'src/store/types';
import validationSchema from './schema';

const ROLES = [
  { label: '', value: '' },
  { label: 'Regular User', value: 'user' },
  { label: 'Restaurant Owner', value: 'owner' },
];

function Signup() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = async (values) => {
    await dispatch(
      signup({
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        role: values.role,
      })
    );
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <Box display="flex" flexDirection="column" height="100vh" justifyContent="center" mt={-4}>
      <Container maxWidth="sm">
        <form onSubmit={formik.handleSubmit}>
          <Card>
            <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
              <Typography variant="h4">Create Account</Typography>
            </Box>
            <CardContent>
              {status === requestRejected(SIGNUP_REQUEST) && (
                <Alert variant="filled" severity="error">
                  {error}
                </Alert>
              )}
              <Box display="flex" justifyContent="space-between">
                <Box width="48%">
                  <InputField
                    formik={formik}
                    name="firstName"
                    label="First Name"
                    placeholder="First Name"
                  />
                </Box>
                <Box width="48%">
                  <InputField
                    formik={formik}
                    name="lastName"
                    label="Last Name"
                    placeholder="Last Name"
                  />
                </Box>
              </Box>
              <InputField
                formik={formik}
                type="email"
                name="email"
                label="Email"
                placeholder="Email"
              />
              <InputField
                formik={formik}
                type="select"
                name="role"
                label="Role"
                placeholder="Role"
                options={ROLES}
              />
              <Box display="flex" justifyContent="space-between">
                <Box width="48%">
                  <InputField
                    formik={formik}
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="********"
                  />
                </Box>
                <Box width="48%">
                  <InputField
                    formik={formik}
                    type="password"
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                  />
                </Box>
              </Box>
              <Box my={2}>
                <Button
                  color="primary"
                  disabled={formik.isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Create Account
                </Button>
              </Box>
            </CardContent>
          </Card>
          <Box mt={5} textAlign="center">
            <Typography variant="body1">
              Already have an account ?{' '}
              <Link component={RouterLink} to="/login">
                Sign In
              </Link>
            </Typography>
          </Box>
        </form>
      </Container>
    </Box>
  );
}

export default Signup;
