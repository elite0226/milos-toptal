import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  Typography
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import {
  Edit as EditIcon,
  DeleteForever as DeleteIcon,
  Reply as ReplyIcon,
} from '@material-ui/icons';
import { useConfirm } from 'material-ui-confirm';

import { Loader } from 'src/components';
import { getReviews, setReview, deleteReview } from 'src/store/actions/review';
import { decimalFormat } from 'src/utils/number';
import ROLES from 'src/constants';
import ReviewDialog from '../ReviewDialog';

import useStyles from './style';

function RestaurantDetails() {
  const classes = useStyles();
  const { restaurantId } = useParams();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(true);
  const [openReviewDialog, setOpenReviewDialog] = React.useState(false);
  const [reviewId, setReviewId] = React.useState(null);

  const dispatch = useDispatch();
  const { restaurants } = useSelector(state => state.restaurant);
  const { profile } = useSelector(state => state.auth);
  const { reviews, totalCount, average, highest, lowest, canReply } = useSelector(state => state.review);

  const confirm = useConfirm();

  const fetchReviews = React.useCallback(async () => {
    setLoading(true);
    await dispatch(getReviews(restaurantId, page * rowsPerPage, rowsPerPage));
    setLoading(false);
  }, [dispatch, page, rowsPerPage, restaurantId]);

  React.useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const restaurant = React.useMemo(() => {
    return restaurants.find((item) => item.id === +restaurantId);
  }, [restaurants, restaurantId]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleLeaveComment = () => {
    dispatch(setReview({}));
    setOpenReviewDialog(true);
    setReviewId('new');
  };

  const handleUpdateReview = (id) => () => {
    const review = reviews.find((item) => item.id === id);
    dispatch(setReview(review));
    setReviewId(id);
    setOpenReviewDialog(true);
  };

  const handleDeleteReview = (id) => () => {
    confirm({
      description: 'Are you going to delete this restaurant?',
    }).then(async () => {
      await dispatch(deleteReview(restaurantId, id));
      if (totalCount === page * rowsPerPage + 1 && page > 0) {
        setPage(page - 1);
      } else {
        fetchReviews();
      }
    });
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Paper>
        <Box className={classes.details}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4">{restaurant.name}</Typography>
            {canReply && (profile.role === ROLES.USER || profile.role === ROLES.ADMIN) && (
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={handleLeaveComment}
              >
                Leave comment
              </Button>
            )}
          </Box>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Box display="flex" flexDirection="column">
              <Typography variant="h6">Average Rating</Typography>
              <Box display="flex" alignItems="center">
                <Rating className={classes.rating} value={average} precision={0.1} readOnly />
                <Typography variant="subtitle2">({decimalFormat(average, 2)})</Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography variant="h6">Highest Rating</Typography>
              <Box display="flex" alignItems="center">
                <Rating className={classes.rating} value={highest} precision={0.1} readOnly />
                <Typography variant="subtitle2">({highest})</Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography variant="h6">Lowest Rating</Typography>
              <Box display="flex" alignItems="center">
                <Rating className={classes.rating} value={lowest} precision={0.1} readOnly />
                <Typography variant="subtitle2">({lowest})</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: 70 }}>#</TableCell>
                <TableCell>Reviewer</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Visit Date</TableCell>
                <TableCell>Comment</TableCell>
                <TableCell>Reply</TableCell>
                {profile.role === ROLES.ADMIN && <TableCell>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {reviews &&
                reviews.map((review, index) => (
                  <TableRow key={review.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      {review.reviewer
                        ? `${review.reviewer.firstName} ${review.reviewer.lastName}`
                        : ''}
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Rating
                          className={classes.rating}
                          value={review.rating}
                          precision={0.1}
                          readOnly
                        />
                        <Typography variant="subtitle2">({review.rating})</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{review.visitDate.slice(0, 10)}</TableCell>
                    <TableCell>{review.comment}</TableCell>
                    <TableCell className={classes.noPadding}>
                      {review.reply || profile.role !== ROLES.OWNER ? (
                        review.reply
                      ) : (
                        <IconButton>
                          <ReplyIcon />
                        </IconButton>
                      )}
                    </TableCell>
                    {profile.role === ROLES.ADMIN && (
                      <TableCell className={classes.noPadding}>
                        <IconButton onClick={handleUpdateReview(review.id)}>
                          <EditIcon color="primary" />
                        </IconButton>
                        <IconButton onClick={handleDeleteReview(review.id)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
      {openReviewDialog && (
        <ReviewDialog
          open={openReviewDialog}
          reviewId={reviewId}
          fetch={fetchReviews}
          onClose={() => setOpenReviewDialog(false)}
        />
      )}
    </>
  );
}

export default RestaurantDetails;