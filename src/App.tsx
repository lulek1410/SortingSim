import { useState } from "react";
import "./App.css";
import Chart from "./components/Chart";
import Controls from "./components/Controls";

function App() {
	const [isSorting, setIsSorting] = useState(false);
	return (
		<>
			<Controls onRun={() => setIsSorting(true)} />
			<Chart isSorting={isSorting} endSort={() => setIsSorting(false)} />
		</>
	);
}

export default App;
