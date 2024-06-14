import { useEffect, useState } from "react";
import { getFarms } from "../api/Aerobotics";
import { fetchExponentialBackoff } from "../api/ExponentialBackoff";
import { Farms } from "../interfaces/Api";

export const Overview = () => {
	const [farms, setFarms] = useState<Farms | undefined>(undefined);

	useEffect(() => {
		fetchExponentialBackoff(getFarms, { baseDelayMs: 1000, maxAttempts: 1 }).then((response) => {
			setFarms(response);
		});
	}, []);

	console.log(farms);

	return (
		<div className="app" data-testid="app">
			<div className="content">
				Frontend
			</div>
		</div>
	);
};