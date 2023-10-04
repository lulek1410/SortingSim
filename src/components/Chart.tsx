import { CSSProperties, useEffect, useReducer } from "react";
import "./Chart.css";
import { bubbleSort } from "./../scripts/bubbleSort";

const shuffle = <T,>(array: Array<T>): Array<T> => {
	return array.sort(() => Math.random() - 0.5);
};

export interface Value {
	value: number;
	isSelected: boolean;
}

interface ChartData {
	values: Value[];
	selectedIndexes: { index1: number; index2: number };
}

type ChartAction =
	| {
			type: "mark_selected";
			newSelectedIndexes: { index1: number; index2: number };
	  }
	| {
			type: "swap" | "remove_mark";
	  };

const chartReducer = (state: ChartData, action: ChartAction): ChartData => {
	const values = state.values;
	const { index1: selectedIndex1, index2: selectedIndex2 } =
		state.selectedIndexes;

	switch (action.type) {
		case "mark_selected": {
			const { index1, index2 } = action.newSelectedIndexes;

			values[selectedIndex1].isSelected = false;
			values[selectedIndex2].isSelected = false;
			values[index1].isSelected = true;
			values[index2].isSelected = true;

			return {
				values: [...values],
				selectedIndexes: { index1, index2 },
			};
		}
		case "swap": {
			const newValues = [...values];
			[newValues[selectedIndex1], newValues[selectedIndex2]] = [
				newValues[selectedIndex2],
				newValues[selectedIndex1],
			];

			return {
				...state,
				values: newValues,
			};
		}
		case "remove_mark": {
			values[selectedIndex1].isSelected = false;
			values[selectedIndex2].isSelected = false;

			return {
				...state,
				values: [...values],
			};
		}
		default:
			return state;
	}
};

interface ChartProps {
	isSorting: boolean;
	endSort: () => void;
}

const Chart = ({ isSorting, endSort }: ChartProps) => {
	const initialValues: Array<Value> = shuffle(
		Array.from({ length: 50 }, (_, i) => {
			return { value: ++i, isSelected: false };
		})
	);
	const initialData: ChartData = {
		values: initialValues,
		selectedIndexes: { index1: 0, index2: 0 },
	};
	const [data, dispatch] = useReducer(chartReducer, initialData);
	const generator = bubbleSort([...data.values]);

	useEffect(() => {
		let animationTimeout: number | undefined;
		const animateSort = () => {
			const output = generator.next().value;
			if (output) {
				const { swap, index } = output;
				dispatch({
					type: "mark_selected",
					newSelectedIndexes: { index1: index, index2: index - 1 },
				});
				animationTimeout = setTimeout(() => {
					if (swap) {
						dispatch({
							type: "swap",
						});
					}
					animateSort();
				}, 20);
			} else {
				dispatch({ type: "remove_mark" });
				endSort();
			}
		};
		if (isSorting) {
			animateSort();
		} else if (animationTimeout) {
			clearTimeout(animationTimeout);
		}
		return () => {
			clearTimeout(animationTimeout);
		};
	}, [isSorting]);

	return (
		<div className="chart">
			{data.values.map(({ value, isSelected }) => (
				<div
					key={value}
					className={"value" + (isSelected ? " selected" : "")}
					style={{ "--value": value } as CSSProperties}
				></div>
			))}
		</div>
	);
};

export default Chart;
