import { combineReducers } from '@reduxjs/toolkit';
import Post_Reducer from './post';

const rootReducer = combineReducers({
  post: Post_Reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
