import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './Auth';
import friendsReducer from './Friends';

export default configureStore({
  reducer: {
    authToken: tokenReducer,
    friendsIds: friendsReducer,
  },
});
