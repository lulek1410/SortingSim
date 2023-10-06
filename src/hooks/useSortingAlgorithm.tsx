import { bubbleSort } from "scripts/bubbleSort";
import { Value } from "store/reducers/chartDataSlice";

export const useSortingAlgorithm = (name: string, array: Array<Value>) => {
	switch (name) {
		case "Bubble sort":
			return bubbleSort(array);
		case "Insertion sort":
			return;
		case "Merge sort":
			return;
		case "Quick sort":
			return;
		case "Bucket sort":
			return;
		default:
			return;
	}
};
