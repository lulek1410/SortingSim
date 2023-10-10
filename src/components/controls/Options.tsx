import "./Options.css";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import {
	reset,
	restoreOriginalValues,
	syncValues,
} from "store/reducers/chartDataSlice";
import { setDelay } from "store/reducers/setttingsSlice";
import { start, pause, resume, dataSynced } from "store/reducers/stateSlice";

const Options = () => {
	const dispatch = useAppDispatch();
	const { selectedAlgorithm, delay } = useAppSelector(
		({ settings }) => settings
	);
	const { isSorting, isPaused, isDataSynced } = useAppSelector(
		({ state }) => state
	);

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
					disabled={!isPaused && isSorting}
				/>
			</div>
			<div className="buttons">
				<button
					onClick={() => {
						dispatch(syncValues());
						dispatch(start());
					}}
					disabled={!selectedAlgorithm || isPaused || isSorting}
				>
					Run
				</button>
				<button
					onClick={() => {
						dispatch(reset());
						dispatch(dataSynced(false));
					}}
					disabled={isPaused || isSorting}
				>
					Shuffle
				</button>
				<button
					className="btn-2col"
					onClick={() => (isPaused ? dispatch(resume()) : dispatch(pause()))}
					disabled={!isSorting}
				>
					{isPaused ? "Resume" : "Pause"}
				</button>
				<button
					className="btn-2col"
					onClick={() => {
						dispatch(restoreOriginalValues());
						dispatch(dataSynced(true));
					}}
					disabled={isSorting || isDataSynced}
				>
					Restore Data Set
				</button>
			</div>
		</div>
	);
};

export default Options;
