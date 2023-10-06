import "./Options.css";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { setDelay } from "store/reducers/setttingsSlice";
import { start } from "store/reducers/stateSlice";

const Options = () => {
	const dispatch = useAppDispatch();
	const { selectedAlgorithm, delay } = useAppSelector(
		({ settings }) => settings
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
				/>
			</div>
			<button onClick={() => dispatch(start())} disabled={!selectedAlgorithm}>
				Run
			</button>
		</div>
	);
};

export default Options;
