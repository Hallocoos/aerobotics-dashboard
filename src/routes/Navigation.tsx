import { Route, Routes } from "react-router-dom";
import { Overview } from "../pages/Overview";

export const Navigation = () => {
	return (
		<Routes>
			<Route index element={<Overview />} />
		</Routes>
	);
};