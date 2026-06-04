import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-unresolved
import { io } from 'socket.io-client';
import { CREATE, UPDATE, DELETE, LIKE } from './constants/actionTypes';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts } from './actions/posts';
import useStyles from './styles';
import memories from './images/memories.png';

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts());

    const socket = io('http://localhost:5000');

    socket.on('postCreated', (post) => dispatch({ type: CREATE, payload: post }));
    socket.on('postUpdated', (post) => dispatch({ type: UPDATE, payload: post }));
    socket.on('postDeleted', (id) => dispatch({ type: DELETE, payload: id }));
    socket.on('postLiked', (post) => dispatch({ type: LIKE, payload: post }));

    const onFocus = () => dispatch(getPosts());
    window.addEventListener('focus', onFocus);

    return () => {
      socket.disconnect();
      window.removeEventListener('focus', onFocus);
    };
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
