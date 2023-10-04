import { CSSProperties } from "react";
import "./Chart.css";

const values = Array.from({ length: 50 }, (_, i) => ++i)

const shuffle = <T,>(array: Array<T>) => {
	return array.sort(() => Math.random() - 0.5);
};

const Chart = () => {
  shuffle(values);
	return (
		<div className="chart">
			{values.map((val) => (
				<div
					key={val}
					className="value"
					style={{ "--value": val } as CSSProperties}
				></div>
			))}
		</div>
	);
};

export default Chart;
