import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Algorithms =
	| ""
	| "Bubble sort"
	| "Insertion sort"
	| "Selection sort"
	| "Quick sort"
	| "Bucket sort";

interface Settings {
	selectedAlgorithm: Algorithms;
	delay: number;
}

const initialState: Settings = {
	selectedAlgorithm: "",
	delay: 20,
};

export const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		setAlgorithm: (state, { payload }: PayloadAction<Algorithms>) => {
			state.selectedAlgorithm = payload;
		},
		setDelay: (state, { payload }: PayloadAction<number>) => {
			state.delay = payload;
		},
	},
});

export const { setAlgorithm, setDelay } = settingsSlice.actions;
export default settingsSlice.reducer;
