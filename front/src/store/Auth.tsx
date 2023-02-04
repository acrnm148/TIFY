import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// 1밀리초 기준으로 하는 getTime()함수에 1시간을 더한 값으로 져장
export const TOKEN_TIME_OUT = 60 * 60 * 1000;

type Token = {
  authenticated: boolean;
  accessToken: '';
  expireTime: number;
  user: string | null;
};

export const tokenSlice = createSlice({
  name: 'authToken',
  initialState: {
    authenticated: false,
    accessToken: '',
    expireTime: 0,
    userId: 0,
    userEmail: '',
  },
  reducers: {
    SET_TOKEN: (state, action: PayloadAction<string>) => {
      state.authenticated = true;
      state.accessToken = action.payload;
      state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
    },
    // payload 둘을 나눠야 할 거 같아서 SET_USER, SET_TOKEN 나눔
    SET_USERID: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },

    SET_USEREMAIL: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },

    // 정보 삭제하면서 초기화
    DELETE_TOKEN: (state) => {
      state.authenticated = false;
      state.accessToken = '';
      state.expireTime = 0;
      state.userId = 0;
      state.userEmail = '';
    },
  },
});

let store = configureStore({
  reducer: {},
});

// export const userSlice = createSlice({
//   name: 'user',
//   initialState: { user: null },
//   reducers: {
//     SET_USER(state, action) {
//       state.user = action.payload;
//     },
//     DELETE_USER(state) {
//       state.user
//     }
//   },
// });

//state 타입을 export 해두는건데 나중에 쓸 데가 있음
export type RootState = ReturnType<typeof store.getState>;

export const { SET_TOKEN, DELETE_TOKEN, SET_USERID, SET_USEREMAIL } =
  tokenSlice.actions;

export default tokenSlice.reducer;
