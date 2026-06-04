import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';
import { getPosts } from '../../actions/posts';

const placeholderStyle = { background: '#e0e0e0', height: 180, borderRadius: 8 };

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(getPosts()).finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {[...Array(6)].map((_, i) => (
          <Grid key={i} item xs={12} sm={6} md={6}>
            <div style={placeholderStyle} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
