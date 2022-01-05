import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from './store';

export interface postsState {
  post: object;
  error: string;
}

export const initialState = {
  post: {},
  error: '',
};

const postsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getPostsSuccess(state, { payload }) {
      state.post = payload;
    },
    getPostsFailure(state, { payload }: PayloadAction<postsState>) {
      state.error = payload.error;
    },
    fetchPostInit(state) {
      state.post = '';
    },
  },
});

export const { getPostsSuccess, getPostsFailure, fetchPostInit } = postsSlice.actions;

export const PostGet =
  (payload): AppThunk =>
  async (dispatch: AppDispatch) => {
    dispatch(getPostsSuccess(payload));
  };

export const PostInit = (): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(fetchPostInit());
};

export default postsSlice.reducer;
