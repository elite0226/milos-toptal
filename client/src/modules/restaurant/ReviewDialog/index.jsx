import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { useFormik } from 'formik';

import { InputField } from 'src/components';
import { createReview, updateReview } from 'src/store/actions/review';
import ROLES from 'src/constants';

import validationSchema from './schema';

function ReviewDialog({ open, reviewId, onClose, fetch }) {
  const { restaurantId } = useParams();

  const dispatch = useDispatch();
  const { review } = useSelector((state) => state.review);
  const { profile } = useSelector((state) => state.auth);

  const [rating, setRating] = useState(review.rating || 1);

  const handleSubmit = async (values) => {
    if (reviewId === 'new') {
      await dispatch(createReview(restaurantId, values));
      onClose();
      fetch();
    } else {
      await dispatch(updateReview(restaurantId, reviewId, values));
      onClose();
      fetch();
    }
  };

  const formik = useFormik({
    initialValues: {
      reviewerId: review?.commenter?.id || profile.id,
      rating: review?.rating || 1,
      visitDate: (review?.visitDate || '').slice(0, 10),
      comment: review?.comment || '',
      reply: review?.reply || '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <>
      <Dialog onClose={onClose} aria-labelledby="comment-dialog" open={open}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle disableTypography>
            <Typography variant="h6">
              {reviewId === 'new' ? 'LEAVE A NEW COMMENT' : 'UPDATE A COMMENT'}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box mb={1}>
              <Typography component="legend">How do you like this restaurant?</Typography>
              <Box display="flex" alignItems="center" mt="4px">
                <Rating value={1} max={1} readOnly />
                <Rating
                  name="rating"
                  value={formik.values.rating - 1}
                  max={4}
                  precision={0.1}
                  onChange={(event, newValue) => formik.setFieldValue('rating', newValue + 1)}
                  onChangeActive={(event, newValue) => setRating(newValue + 1)}
                />
                <Typography variant="subtitle2" fontWeight="bold" style={{ marginLeft: 8 }}>
                  ({rating !== 0 ? rating : formik.values.rating})
                </Typography>
              </Box>
            </Box>
            <InputField
              formik={formik}
              type="date"
              name="visitDate"
              label="Visit Date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <InputField
              formik={formik}
              name="comment"
              label="Your comment"
              multiline
              rows={5}
            />
            {profile.role === ROLES.ADMIN && (
              <InputField
                formik={formik}
                name="reply"
                label="Reply"
                multiline
                rows={3}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>CANCEL</Button>
            <Button type="submit" variant="contained" color="primary" disableElevation>
              {reviewId === 'new' ? 'CREATE' : 'UPDATE'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default ReviewDialog;
