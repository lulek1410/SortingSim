import { createSlice } from "@reduxjs/toolkit";

interface State {
	isSorting: boolean;
	isPaused: boolean;
}

const initialState: State = {
	isSorting: false,
	isPaused: false,
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
		end: (state) => {
			state.isPaused = false;
			state.isSorting = false;
		},
	},
});

export const { start, pause, end } = stateSlice.actions;
export default stateSlice.reducer;
