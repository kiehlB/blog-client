import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from './store';

export interface userState {
  user?: object;
  error?: string;
  input?: string;
  isAuth: string;
}

export const initialState = {
  user: {},
  error: '',
  input: '',
  isAuth: 'idel',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getuserStart(state) {
      state.isAuth = 'pending';
    },
    getuserSuccess(state) {
      state.isAuth = 'resolved';
    },
    logoutSuccess(state) {
      state.isAuth = 'idel';
    },
    getuserFailure(state, { payload }: PayloadAction<userState>) {
      state.isAuth = 'rejected';
    },
    fetchuserInit(state) {
      state.user = '';
    },

    getSearch(state, { payload }) {
      state.input = payload;
    },
  },
});

export const {
  getuserSuccess,
  getuserFailure,
  fetchuserInit,
  getSearch,
  getuserStart,
  logoutSuccess,
} = userSlice.actions;

export const userGet = (): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(getuserSuccess());
};

export const userStart = (): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(getuserStart());
};

export const userInit = (): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(fetchuserInit());
};

export const userLogout = (): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(logoutSuccess());
};

export const getSearchInput =
  (payload): AppThunk =>
  async (dispatch: AppDispatch) => {
    dispatch(getSearch(payload));
  };

export default userSlice.reducer;
