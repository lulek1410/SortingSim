import { useDispatch } from "react-redux";
import "./AlgorithmPicker.css";
import { Algorithms, setAlgorithm } from "store/reducers/setttingsSlice";

const fields = [
	{
		id: "bubble",
		title: "Bubble sort",
	},
	{
		id: "insertion",
		title: "Insertion sort",
	},
	{
		id: "merge",
		title: "Merge sort",
	},
	{
		id: "quick",
		title: "Quick sort",
	},
	{
		id: "bucket",
		title: "Bucket sort",
	},
];

const AlgorithmPicker = () => {
	const dispatch = useDispatch();

	return (
		<fieldset>
			<legend>Choose algorithm</legend>
			<div className="algorithm-controls">
				{fields.map(({ id, title }) => (
					<div key={id}>
						<input
							type="radio"
							id={id}
							name="algorithm"
							onChange={() => dispatch(setAlgorithm(title as Algorithms))}
						/>
						<label htmlFor={id}>{title}</label>
					</div>
				))}
			</div>
		</fieldset>
	);
};

export default AlgorithmPicker;
