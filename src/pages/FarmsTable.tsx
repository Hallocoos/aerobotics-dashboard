import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Farms } from "../interfaces/Farm";
import { getAllFarms } from "../api/Farms";
import { getAllOrchards } from "../api/Orchards";
import { Orchards } from "../interfaces/Orchard";
import { getAllSurveys } from "../api/Survey";
import { Surveys } from "../interfaces/Survey";
import { Link } from "react-router-dom";

const totalTreesSurveyed = (surveys: Surveys, orchard_id: number): number => {
	let total = 0;
	surveys?.results
		.filter((survey) => survey.orchard_id == orchard_id)
		.forEach((survey) => {
			total += survey.polygon.split(" ").length;
		});
	return total;
};

const latestSurveyDate = (surveys: Surveys, orchard_id: number): Date => {
	const dates: Date[] = [];
	surveys?.results
		.filter((survey) => survey.orchard_id == orchard_id)
		.forEach((survey) => {
			dates.push(new Date(survey.date));
		});
	return new Date(Math.max(...dates.map(date => date.getTime())));
};

const farmNameByOrchard = (farms: Farms, orchard_farm_id: number): string | undefined => {
	return farms?.results.find((farm) => farm.id == orchard_farm_id)?.name;
};

const farmIdByOrchard = (farms: Farms, orchard_farm_id: number): number | undefined => {
	return farms?.results.find((farm) => farm.id == orchard_farm_id)?.id;
};

export const FarmsTable = () => {
	const [farms, setFarms] = useState<Farms | undefined>(undefined);
	const [orchards, setOrchards] = useState<Orchards | undefined>(undefined);
	const [surveys, setSurveys] = useState<Surveys | undefined>(undefined);

	useEffect(() => {
		getAllFarms().then((allFarms) => setFarms(allFarms));
		getAllOrchards().then((allOrchards) => setOrchards(allOrchards));
		getAllSurveys().then((allSurveys) => setSurveys(allSurveys));
	}, []);

	return (
		<div className="app" data-testid="app">
			<div className="content">
				{farms && orchards && surveys && <Table striped bordered hover>
					<thead>
						<tr>
							<th>Farm Name</th>
							<th>Orchard name</th>
							<th>Total trees surveyed</th>
							<th>Latest survey date</th>
							<th>Details</th>
						</tr>
					</thead>
					<tbody>
						{orchards?.results.map((orchard) => {
							return (
								<tr key={orchard.name + orchard.id}>
									<td>{farmNameByOrchard(farms, orchard.farm_id)}</td>
									<td>{orchard.name}</td>
									<td>{totalTreesSurveyed(surveys, orchard.id)}</td>
									<td>{latestSurveyDate(surveys, orchard.id).toDateString()}</td>
									<td><button type="button" className="btn btn-primary">
										<Link to={`farm/${farmIdByOrchard(farms, orchard.farm_id)}`}>
											{"> Details"}
										</Link>
									</button></td>
								</tr>
							);
						})}
					</tbody>
				</Table>}
			</div>
		</div>
	);
};