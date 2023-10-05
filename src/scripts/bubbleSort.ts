import { Value } from "store/reducers/chartDataSlice";

export function* bubbleSort(array: Array<Value>) {
	let n = array.length;
	let swapped = true;
	while (swapped) {
		swapped = false;
		for (let i = 1; i < n; ++i) {
			let didSwap = false;
			if (array[i - 1].value > array[i].value) {
				[array[i - 1], array[i]] = [array[i], array[i - 1]];
				swapped = true;
				didSwap = true;
			}
			yield { didSwap: didSwap, index: i };
		}
		n = n - 1;
	}
}
