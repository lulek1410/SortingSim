import "./Controls.css";

interface ControlsProps {
	onRun: () => void;
}

const Controls = ({ onRun }: ControlsProps) => {
	return (
		<div className="controls">
			<fieldset>
				<legend>Choose algorithm</legend>
				<div className="algorithm-controls">
					<div>
						<input type="radio" id="bubble" name="algorithm" />
						<label htmlFor="bubble">Bubble sort</label>
					</div>
					<div>
						<input type="radio" id="insertion" name="algorithm" />
						<label htmlFor="insertion">Insertion sort</label>
					</div>
					<div>
						<input type="radio" id="merge" name="algorithm" />
						<label htmlFor="merge">Merge sort</label>
					</div>
					<div>
						<input type="radio" id="quick" name="algorithm" />
						<label htmlFor="quick">Quick sort</label>
					</div>
					<div>
						<input type="radio" id="bucket" name="algorithm" />
						<label htmlFor="bucket">Bucket sort</label>
					</div>
				</div>
			</fieldset>
			<div>
				<legend>Options</legend>
				<div className="delay-controls">
					<label htmlFor="delay">Delay (ms):</label>
					<input type="number" id="delay" name="delay" min="100" max="1000" />
				</div>
				<button onClick={onRun}>Run</button>
			</div>
		</div>
	);
};

export default Controls;
