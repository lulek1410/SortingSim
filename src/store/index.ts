import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./reducers/setttingsSlice";
import stateReducer from "./reducers/stateSlice";
import chartDataReducer from "./reducers/chartDataSlice";

export const store = configureStore({
	reducer: {
		settings: settingsReducer,
		state: stateReducer,
		chartData: chartDataReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
