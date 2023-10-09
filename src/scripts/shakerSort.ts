import { Value } from "store/reducers/chartDataSlice";

export function* shakerSort(array: Array<Value>) {
	let end = array.length;
	let start = 1;
	let swapped = true;
	while (swapped) {
		swapped = false;
		for (let i = start; i < end; ++i) {
			let didSwap = false;
			if (array[i - 1].value > array[i].value) {
				[array[i - 1], array[i]] = [array[i], array[i - 1]];
				swapped = true;
				didSwap = true;
			}
			yield { didSwap: didSwap, index1: i, index2: i - 1 };
		}
		--end;
		for (let j = end; j >= start; --j) {
			let didSwap = false;
			if (array[j - 1].value > array[j].value) {
				[array[j - 1], array[j]] = [array[j], array[j - 1]];
				swapped = true;
				didSwap = true;
			}
			yield { didSwap: didSwap, index1: j, index2: j - 1 };
		}
		++start;
	}
}
