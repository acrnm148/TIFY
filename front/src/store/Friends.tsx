import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';

export const friendsSlice = createSlice({
    name: 'friendsId',
    initialState: {
        friendsIds: [],
    },
    reducers:{
        SET_FRIENDS_IDS: (state, action:PayloadAction<[]>)=> {
            state.friendsIds = [...state.friendsIds,...action.payload]
            console.log('친구목록 받았다야',state.friendsIds)
        }       
    }
})
let store = configureStore({
    reducer: friendsSlice.reducer
  });
export type RootStateFriends = ReturnType<typeof store.getState>

export const { SET_FRIENDS_IDS } =
friendsSlice.actions;

export default friendsSlice.reducer;