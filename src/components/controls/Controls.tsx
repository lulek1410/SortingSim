import "./Controls.css";
import AlgorithmPicker from "./AlgorithmPicker";
import Options from "./Options";

const Controls = () => {
	return (
		<div className="controls">
			<AlgorithmPicker />
			<Options />
		</div>
	);
};

export default Controls;
