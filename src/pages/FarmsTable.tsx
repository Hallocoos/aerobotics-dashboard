import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Farms } from "../interfaces/Farm";
import { getAllFarms } from "../api/Farms";
import { getAllOrchards } from "../api/Orchards";
import { Orchards } from "../interfaces/Orchard";
import { getAllSurveys, getSurveyById } from "../api/Survey";
import { Surveys } from "../interfaces/Survey";

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

const farmNamesByOrchard = (farms: Farms, orchard_farm_id: number): string | undefined => {
	return farms?.results.find((farm) => farm.id == orchard_farm_id)?.name;
};

const averageNDVI = (survey_id: number | undefined) => {
	let total = 0;
	let count = 0;
	if (survey_id) {
		getSurveyById(survey_id).then((surveys) => surveys.results.forEach((survey) => {
			console.log(survey);
			total += survey.ndvi;
			count += 1;
		}));
		return total / count;
	} else return "";
};

export const FarmsTable = () => {
	const [farms, setFarms] = useState<Farms | undefined>(undefined);
	const [orchards, setOrchards] = useState<Orchards | undefined>(undefined);
	const [surveys, setSurveys] = useState<Surveys | undefined>(undefined);
	const [distinctSurveys, setDistinctSurveys] = useState<number[] | undefined>(undefined);

	useEffect(() => {
		getAllFarms().then((allFarms) => setFarms(allFarms));
		getAllOrchards().then((allOrchards) => setOrchards(allOrchards));
		getAllSurveys().then((allSurveys) => setSurveys(allSurveys));
	}, []);

	useEffect(() => {
		const listOfSurveys: number[] = [];
		if (surveys) {
			surveys.results.map((survey) => {
				if (listOfSurveys.indexOf(survey.id) == -1)
					listOfSurveys.push(survey.id);
			});
		}
		setDistinctSurveys(listOfSurveys);
		// surveys.results.find((survey) => survey.orchard_id == orchard.id)?.id;
	}, [surveys]);

	console.log(distinctSurveys);

	return (
		<div className="app" data-testid="app">
			<div className="content">
				Home
			</div>

			{farms && orchards && surveys && <Table striped bordered hover>
				<thead>
					<tr>
						<th>Farm Name</th>
						<th>Orchard name</th>
						<th>Total trees surveyed</th>
						<th>Latest survey date</th>
						<th>Average NDVI</th>
						<th>Average NDRE</th>
					</tr>
				</thead>
				<tbody>
					{orchards?.results.map((orchard) => {
						return (<tr key={orchard.name + orchard.id}>
							<td>{farmNamesByOrchard(farms, orchard.farm_id)}</td>
							<td>{orchard.name}</td>
							<td>{totalTreesSurveyed(surveys, orchard.id)}</td>
							<td>{latestSurveyDate(surveys, orchard.id).toDateString()}</td>
							<td>{ }</td>
							<td>{ }</td>
						</tr>);
					})}
				</tbody>
			</Table>}
		</div>
	);
};