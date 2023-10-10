import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
	isSorting: boolean;
	isPaused: boolean;
	isDataSynced: boolean;
}

const initialState: State = {
	isSorting: false,
	isPaused: false,
	isDataSynced: true,
};

export const stateSlice = createSlice({
	name: "state",
	initialState,
	reducers: {
		start: (state) => {
			state.isSorting = true;
		},
		pause: (state) => {
			state.isPaused = true;
		},
		resume: (state) => {
			state.isPaused = false;
		},
		end: (state) => {
			state.isPaused = false;
			state.isSorting = false;
		},
		dataSynced: (state, { payload }: PayloadAction<boolean>) => {
			state.isDataSynced = payload;
		},
	},
});

export const { start, pause, end, resume, dataSynced } = stateSlice.actions;
export default stateSlice.reducer;
