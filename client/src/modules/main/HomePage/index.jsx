import * as React from 'react';
import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

function Home() {
  const { profile } = useSelector((state) => state.auth);

  return (
    <Typography variant="h3">Welcome, {`${profile.firstName} ${profile.lastName}`}</Typography>
  );
}

export default Home;
