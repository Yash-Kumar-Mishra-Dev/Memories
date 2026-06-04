/* eslint-disable no-console */
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch, getState) => {
  try {
    // optimistic update
    const current = getState().posts.find((p) => p._id === id);
    if (current) {
      dispatch({ type: LIKE, payload: { ...current, likeCount: current.likeCount + 1 } });
    }

    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
    // fallback: refetch posts
    dispatch(getPosts());
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    // optimistic delete
    dispatch({ type: DELETE, payload: id });

    await api.deletePost(id);
  } catch (error) {
    console.log(error.message);
    // fallback: refetch posts
    dispatch(getPosts());
  }
};
