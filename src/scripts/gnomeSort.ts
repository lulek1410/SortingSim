import { Value } from "store/reducers/chartDataSlice";

export function* gnomeSort(array: Array<Value>) {
	let index = 0;
	while (index < array.length) {
		if (index == 0 || array[index].value >= array[index - 1].value) {
			index++;
			if (index < array.length) {
				yield { didSwap: false, index1: index, index2: index - 1 };
			}
		} else {
			[array[index], array[index - 1]] = [array[index - 1], array[index]];
			yield { didSwap: true, index1: index, index2: index - 1 };
			index--;
		}
	}
	return;
}
