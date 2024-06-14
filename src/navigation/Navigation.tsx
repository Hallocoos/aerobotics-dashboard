import { Route, Routes } from "react-router-dom";
import { FarmsTable } from "../pages/FarmsTable";

export const Navigation = () => {
	return (
		<Routes>
			<Route index element={<FarmsTable />} />
		</Routes>
	);
};