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

import { Loader } from 'src/components';
import { getReviews } from 'src/store/actions/review';
import { decimalFormat } from 'src/utils/number';
import ROLES from 'src/constants';

import useStyles from './style';

function RestaurantDetails() {
  const classes = useStyles();
  const { restaurantId } = useParams();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(true);

  const dispatch = useDispatch();
  const { restaurants } = useSelector(state => state.restaurant);
  const { profile } = useSelector(state => state.auth);
  const { reviews, totalCount, average, highest, lowest, canReply } = useSelector(state => state.review);

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
                <TableCell>Commenter</TableCell>
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
                      {review.commenter
                        ? `${review.commenter.firstName} ${review.commenter.lastName}`
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
                        <IconButton>
                          <EditIcon color="primary" />
                        </IconButton>
                        <IconButton>
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
    </>
  );
}

export default RestaurantDetails;