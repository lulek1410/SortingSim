import { CSSProperties, useEffect, useState } from "react";
import "./Chart.css";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import { markSelected, removeMark, swap } from "store/reducers/chartDataSlice";
import { dataSynced, end } from "store/reducers/stateSlice";
import { useSortingAlgorithm } from "hooks/useSortingAlgorithm";

const Chart = () => {
	const { isSorting, isPaused } = useAppSelector(({ state }) => state);
	const { selectedAlgorithm, delay } = useAppSelector(
		({ settings }) => settings
	);
	const data = useAppSelector(({ chartData }) => chartData);
	const generator = useSortingAlgorithm(selectedAlgorithm, [
		...data.staticValues,
	]);
	const dispatch = useAppDispatch();
	const [algorithmStep, setAlgorithmStep] = useState(0);

	useEffect(() => {
		if (generator) {
			let animationTimeout: NodeJS.Timeout | undefined;
			const animateSort = () => {
				if (isPaused) {
					return;
				}
				const output = generator.next().value;
				if (output) {
					const { didSwap, index1, index2 } = output;
					dispatch(markSelected({ index1: index1, index2: index2 }));
					animationTimeout = setTimeout(() => {
						if (didSwap) {
							dispatch(swap());
						}
						setAlgorithmStep((step) => step + 1);
						animateSort();
					}, delay);
				} else {
					dispatch(removeMark());
					dispatch(end());
					dispatch(dataSynced(false));
					setAlgorithmStep(0);
				}
			};
			if (isSorting) {
				for (let i = 0; i < algorithmStep; ++i) {
					generator.next();
				}
				animateSort();
			} else if (animationTimeout) {
				clearTimeout(animationTimeout);
			}
			return () => {
				clearTimeout(animationTimeout);
			};
		}
	}, [isSorting, isPaused]);

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
