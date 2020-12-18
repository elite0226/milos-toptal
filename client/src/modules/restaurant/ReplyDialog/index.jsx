import * as React from 'react';
import { useDispatch } from 'react-redux';
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
import { updateReview } from 'src/store/actions/review';

import validationSchema from './schema';
import useStyles from './style';

function ReplyDialog({ open, restaurantId, reviewId, onClose, fetch }) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    await dispatch(updateReview(restaurantId, reviewId, values));
    onClose();
    fetch();
  };

  const formik = useFormik({
    initialValues: {
      reply: '',
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <>
      <Dialog open={open} onClose={onClose} aria-labelledby="reply-dialog">
          <form className={classes.root} onSubmit={formik.handleSubmit}>
            <DialogTitle disableTypography>
              <Typography variant="h6">ADD REPLY</Typography>
            </DialogTitle>
            <DialogContent>
              <InputField
                formik={formik}
                name="reply"
                label="Your reply"
                multiline
                rows="3"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>CANCEL</Button>
              <Button type="submit" variant="contained" color="primary" disableElevation>
                REPLY
              </Button>
            </DialogActions>
          </form>
      </Dialog>
    </>
  );
}

export default ReplyDialog;
