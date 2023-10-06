import { Value } from "store/reducers/chartDataSlice";

export function* insertionSort(array: Array<Value>) {
	for (let i = 1; i < array.length; ++i) {
		let didSwap = false;
		let j = i;
		while (j > 0 && array[j - 1].value > array[j].value) {
			[array[j - 1], array[j]] = [array[j], array[j - 1]];
			didSwap = true;
			yield { didSwap: didSwap, index: j };
			j--;
		}
	}
}
