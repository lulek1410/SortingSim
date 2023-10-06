import { CSSProperties, useEffect } from "react";
import "./Chart.css";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import { markSelected, removeMark, swap } from "store/reducers/chartDataSlice";
import { end } from "store/reducers/stateSlice";
import { useSortingAlgorithm } from "hooks/useSortingAlgorithm";

const Chart = () => {
	const { isSorting } = useAppSelector(({ state }) => state);
	const { selectedAlgorithm, delay } = useAppSelector(
		({ settings }) => settings
	);
	const data = useAppSelector(({ chartData }) => chartData);
	const generator = useSortingAlgorithm(selectedAlgorithm, [...data.values]);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (generator) {
			let animationTimeout: NodeJS.Timeout | undefined;
			const animateSort = () => {
				const output = generator.next().value;
				if (output) {
					const { didSwap, index } = output;
					dispatch(markSelected({ index1: index, index2: index - 1 }));
					animationTimeout = setTimeout(() => {
						if (didSwap) {
							dispatch(swap());
						}
						animateSort();
					}, delay);
				} else {
					dispatch(removeMark());
					dispatch(end());
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
		}
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
