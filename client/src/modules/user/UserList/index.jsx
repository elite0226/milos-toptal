import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from '@material-ui/core';
import { Edit as EditIcon, DeleteForever as DeleteIcon } from '@material-ui/icons';
import { useConfirm } from 'material-ui-confirm';

import { Loader } from 'src/components';
import { getUsers, deleteUser, setUser } from 'src/store/actions/user';
import UserDialog from '../UserDialog';

import useStyles from './style';

const UsersList = () => {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [userId, setUserId] = React.useState(null);

  const confirm = useConfirm();

  const dispatch = useDispatch();
  const { users, totalCount } = useSelector((state) => state.user);

  const fetchUsers = React.useCallback(async () => {
    setLoading(true);
    await dispatch(getUsers(page * rowsPerPage, rowsPerPage));
    setLoading(false);
  }, [dispatch, page, rowsPerPage]);

  React.useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreateUser = () => {
    dispatch(setUser({}));
    setOpenDialog(true);
    setUserId('new');
  };

  const handleUpdateUser = (id) => () => {
    const user = users.find((item) => item.id === id);
    dispatch(setUser(user));
    setOpenDialog(true);
    setUserId(id);
  };

  const handleDeleteUser = (id) => () => {
    confirm({
      description: 'Are you going to delete this user?',
    }).then(async () => {
      await dispatch(deleteUser(id));
      
      if (totalCount === page * rowsPerPage + 1 && page > 0) {
        setPage(page - 1);
      } else {
        fetchUsers();
      }
    });
  };

  return (
    <>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={handleCreateUser}
        >
          Create a new user
        </Button>
      </Box>
      <Paper className={classes.paper}>
        {loading ? (
          <Loader />
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: 70 }}>#</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users &&
                  users.map((user, index) => (
                    <TableRow key={user.id}>
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className={classes.textCapitalize}>{user.role}</TableCell>
                      <TableCell className={classes.noPadding}>
                        <IconButton onClick={handleUpdateUser(user.id)}>
                          <EditIcon color="primary" />
                        </IconButton>
                        <IconButton onClick={handleDeleteUser(user.id)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </TableCell>
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
        )}
      </Paper>
      {openDialog && (
        <UserDialog
          userId={userId}
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          fetch={fetchUsers}
        />
      )}
    </>
  );
};

export default UsersList;
