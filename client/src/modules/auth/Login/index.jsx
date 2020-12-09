import * as React from 'react';
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
import { login } from 'src/store/actions/auth';
import { requestRejected } from 'src/utils/api';
import { LOGIN_REQUEST } from 'src/store/types';
import validationSchema from './schema';

function Login() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = async (values) => {
    await dispatch(
      login({
        email: values.email,
        password: values.password,
      })
    );
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Box display="flex" flexDirection="column" height="100vh" justifyContent="center" mt={-4}>
      <Container maxWidth="sm">
        <form onSubmit={formik.handleSubmit}>
          <Card>
            <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
              <Typography variant="h4">Welcome back</Typography>
            </Box>
            <CardContent>
              {status === requestRejected(LOGIN_REQUEST) && (
                <Alert variant="filled" severity="error">
                  {error}
                </Alert>
              )}
              <InputField
                formik={formik}
                type="email"
                name="email"
                label="Email"
                placeholder="Email"
              />
              <InputField
                formik={formik}
                type="password"
                name="password"
                label="Password"
                placeholder="********"
              />
              <Box my={2}>
                <Button
                  color="primary"
                  disabled={formik.isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign In
                </Button>
              </Box>
            </CardContent>
          </Card>
          <Box mt={5} textAlign="center">
            <Typography variant="body1">
              Don't have an account ?{' '}
              <Link component={RouterLink} to="/signup">
                Create one here
              </Link>
            </Typography>
          </Box>
        </form>
      </Container>
    </Box>
  );
}

export default Login;
