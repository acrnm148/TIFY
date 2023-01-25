import { createSlice  } from '@reduxjs/toolkit'

export const initialState = {
	test : 0,
	test2 : false,
}

export const giftRecoSlice= createSlice({
	name : 'giftReco',
	initialState,
	reducers: {
		giftRecoReducer : (state, action) => {
			state.test = action.payload },
		},
})

export const { giftRecoReducer } = giftRecoSlice.actions

export const giftRecoUpdate = (value:any) => {
	return (dispatch:any): void => {
		// dispatch(리듀서이름(action지정))
	}
}

export default giftRecoSlice.reducer