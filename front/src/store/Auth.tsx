import { createSlice } from '@reduxjs/toolkit';

// 1밀리초 기준으로 하는 getTime()함수에 1시간을 더한 값으로 져장
export const TOKEN_TIME_OUT = 60 * 60 * 1000;

type Notoken = {
  authenticated: boolean;
  accessToken: string | null;
  expireTime: number;
};

export const tokenSlice = createSlice({
  name: 'authToken',
  initialState: {
    authenticated: false,
    accessToken: null,
    expireTime: 0,
  },
  reducers: {
    SET_TOKEN: (state, action) => {
      state.authenticated = true;
      state.accessToken = action.payload;
      state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
    },
    DELETE_TOKEN: (state) => {
      state.authenticated = false;
      state.accessToken = null;
      state.expireTime = 0;
    },
  },
});

export const { SET_TOKEN, DELETE_TOKEN } = tokenSlice.actions;

export default tokenSlice.reducer;
