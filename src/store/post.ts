import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from './store';

export interface postsState {
  post?: object;
  error?: string;
  input?: string;
}

export const initialState = {
  post: {},
  error: '',
  input: '',
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

    getSearch(state, { payload }) {
      state.input = payload;
    },
  },
});

export const { getPostsSuccess, getPostsFailure, fetchPostInit, getSearch } =
  postsSlice.actions;

export const PostGet =
  (payload): AppThunk =>
  async (dispatch: AppDispatch) => {
    dispatch(getPostsSuccess(payload));
  };

export const PostInit = (): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(fetchPostInit());
};

export const getSearchInput =
  (payload): AppThunk =>
  async (dispatch: AppDispatch) => {
    dispatch(getSearch(payload));
  };

export default postsSlice.reducer;
