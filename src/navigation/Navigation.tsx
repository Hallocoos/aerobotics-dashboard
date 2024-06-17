import { Route, Routes } from "react-router-dom";
import { FarmsTable } from "../pages/FarmsTable";
import { Farm } from "../pages/Farm";

export const Navigation = () => {
	return (
		<Routes>
			<Route index element={<FarmsTable />} />
			<Route path="/farm/:id" element={<Farm />} />
		</Routes>
	);
};