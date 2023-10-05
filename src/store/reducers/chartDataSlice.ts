import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { shuffle } from "utils/shuffle";

export interface Value {
	value: number;
	isSelected: boolean;
}

interface Indexes {
	index1: number;
	index2: number;
}

interface ChartData {
	values: Value[];
	selectedIndexes: Indexes;
}

const initialValues: Array<Value> = shuffle(
	Array.from({ length: 50 }, (_, i) => {
		return { value: ++i, isSelected: false };
	})
);

const initialState: ChartData = {
	values: initialValues,
	selectedIndexes: { index1: 0, index2: 0 },
};

export const chartDataSlice = createSlice({
	name: "chartData",
	initialState,
	reducers: {
		markSelected: (
			{ values, selectedIndexes },
			{ payload }: PayloadAction<Indexes>
		) => {
			let { index1: selectedIndex1, index2: selectedIndex2 } = selectedIndexes;
			values[selectedIndex1].isSelected = false;
			values[selectedIndex2].isSelected = false;
			const { index1, index2 } = payload;
			values[index1].isSelected = true;
			values[index2].isSelected = true;
			selectedIndexes.index1 = index1;
			selectedIndexes.index2 = index2;
		},
		swap: ({ values, selectedIndexes }) => {
			const { index1, index2 } = selectedIndexes;
			[values[index1], values[index2]] = [values[index2], values[index1]];
		},
		removeMark: ({ values, selectedIndexes }) => {
			const { index1, index2 } = selectedIndexes;
			values[index1].isSelected = false;
			values[index2].isSelected = false;
		},
		reset: ({ values }) => {
			values = shuffle(values);
		},
	},
});

export const { markSelected, swap, removeMark, reset } = chartDataSlice.actions;
export default chartDataSlice.reducer;
