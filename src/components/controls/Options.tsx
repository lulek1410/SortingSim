import "./Options.css";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { reset } from "store/reducers/chartDataSlice";
import { setDelay } from "store/reducers/setttingsSlice";
import { start } from "store/reducers/stateSlice";

const Options = () => {
	const dispatch = useAppDispatch();
	const { selectedAlgorithm, delay } = useAppSelector(
		({ settings }) => settings
	);
	const { isSorting, isPaused } = useAppSelector(({ state }) => state);

	return (
		<div>
			<legend>Options</legend>
			<div className="delay-controls">
				<label htmlFor="delay">Delay (ms):</label>
				<input
					type="number"
					id="delay"
					name="delay"
					min="10"
					max="1000"
					value={delay}
					onChange={(e) => dispatch(setDelay(parseInt(e.target.value, 10)))}
				/>
			</div>
			<div className="buttons">
				<button onClick={() => dispatch(start())} disabled={!selectedAlgorithm}>
					Run
				</button>
				<button
					onClick={() => dispatch(reset())}
					disabled={isPaused || isSorting}
				>
					Shuffle
				</button>
			</div>
		</div>
	);
};

export default Options;
