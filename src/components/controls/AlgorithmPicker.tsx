import { useDispatch } from "react-redux";
import "./AlgorithmPicker.css";
import { Algorithms, setAlgorithm } from "store/reducers/setttingsSlice";
import { useAppSelector } from "hooks/useAppSelector";

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
		id: "selection",
		title: "Selection sort",
	},
	{
		id: "shaker",
		title: "Shaker sort",
	},
	{
		id: "gnome",
		title: "Gnome sort",
	},
];

const AlgorithmPicker = () => {
	const dispatch = useDispatch();
	const { isSorting } = useAppSelector(({ state }) => state);

	return (
		<fieldset disabled={isSorting}>
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
