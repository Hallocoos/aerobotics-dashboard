import { Route, Routes } from "react-router-dom";
import { FarmsTable } from "../pages/FarmsTable";
import { FarmOverview } from "../pages/FarmOverview";

interface RouteItem {
	path: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	element: any;
}

export const Navigation = () => {
	const routes: RouteItem[] = [
		{ path: "/", element: <FarmsTable /> },
		{ path: "/farm/:id", element: <FarmOverview /> }
	];

	return (
		<Routes>
			{routes.map(({ path, element }, key) => (
				<Route
					path={path}
					key={key}
					element={element}
				/>
			))}
		</Routes>
	);
};