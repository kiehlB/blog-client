import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from './store';

export interface userState {
  post?: object;
  error?: string;
  input?: string;
}

export const initialState = {
  user: {},
  error: '',
  input: '',
};

const userSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getuserSuccess(state, { payload }) {
      state.user = payload;
    },
    getuserFailure(state, { payload }: PayloadAction<userState>) {
      state.error = payload.error;
    },
    fetchPostInit(state) {
      state.user = '';
    },

    getSearch(state, { payload }) {
      state.input = payload;
    },
  },
});

export const { getuserSuccess, getuserFailure, fetchPostInit, getSearch } =
  userSlice.actions;

export const PostGet =
  (payload): AppThunk =>
  async (dispatch: AppDispatch) => {
    dispatch(getuserSuccess(payload));
  };

export const PostInit = (): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(fetchPostInit());
};

export const getSearchInput =
  (payload): AppThunk =>
  async (dispatch: AppDispatch) => {
    dispatch(getSearch(payload));
  };

export default userSlice.reducer;
