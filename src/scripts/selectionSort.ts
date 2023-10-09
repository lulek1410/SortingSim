import { Value } from "store/reducers/chartDataSlice";

export function* selectionSort(array: Array<Value>) {
	for (let i = 0; i < array.length; ++i) {
		let minIndex = i;
		for (let j = i + 1; j < array.length; ++j) {
			if (array[j].value < array[minIndex].value) {
				minIndex = j;
			}
			yield { didSwap: false, index1: minIndex, index2: j };
		}
		[array[i], array[minIndex]] = [array[minIndex], array[i]];
		yield { didSwap: true, index1: minIndex, index2: i };
	}
}
