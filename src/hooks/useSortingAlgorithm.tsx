import { bubbleSort } from "scripts/bubbleSort";
import { insertionSort } from "scripts/insertionSort";
import { selectionSort } from "scripts/selectionSort";
import { shakerSort } from "scripts/shakerSort";
import { Value } from "store/reducers/chartDataSlice";

export const useSortingAlgorithm = (name: string, array: Array<Value>) => {
	switch (name) {
		case "Bubble sort":
			return bubbleSort(array);
		case "Insertion sort":
			return insertionSort(array);
		case "Selection sort":
			return selectionSort(array);
		case "Shaker sort":
			return shakerSort(array);
		case "Bucket sort":
			return;
		default:
			return;
	}
};
