import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFarmById } from "../api/Farms";
import { Farm } from "../interfaces/Farm";
import { getAllOrchards } from "../api/Orchards";
import { Orchards } from "../interfaces/Orchard";
import { getAllSurveys, getSurveyById } from "../api/Survey";
import { Survey, TreeSurvey } from "../interfaces/Survey";
import { Bar, BarChart, Brush, CartesianGrid, Legend, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts";
import { groupByCoordinates } from "../helpers/functions";

type sortDirection = "ndvi" | "ndre";

export interface GroupOfCoords {
	[key: string]: TreeSurvey[];
}

interface Average {
	name?: string;
	ndre: number;
	ndvi: number;
}

export const FarmOverview = () => {
	const params = useParams();
	const [farm, setFarm] = useState<Farm | undefined>(undefined);
	const [orchards, setOrchards] = useState<Orchards | undefined>(undefined);
	const [surveys, setSurveys] = useState<Survey[]>([]);
	const [orchardSurveys, setOrchardSurveys] = useState<TreeSurvey[]>([]);
	const [sort] = useState<sortDirection>("ndvi");

	useEffect(() => {
		if (params.id) {
			getFarmById(params.id).then((farm) => setFarm(farm));
			getAllOrchards(params.id).then((orchards) => setOrchards(orchards));
		}
	}, [params.id]);

	useEffect(() => {
		if (orchards && orchards.results.length > 0) {
			const temp_surveys: Survey[] = [];
			orchards.results.forEach((orchard) => {
				getAllSurveys(orchard.id).then((orchard_surveys) => temp_surveys.push(...orchard_surveys.results));
			});
			setSurveys(temp_surveys);
		}
	}, [orchards]);

	useEffect(() => {
		if (surveys.length > 0)
			surveys.forEach((survey) => {
				getSurveyById(survey.id).then((orchard_survey) => setOrchardSurveys([...orchardSurveys, ...orchard_survey.results]));
			});
	}, [surveys]);

	// const averages = Object.entries(groupByCoordinates(orchardSurveys)).map(([key, items]) => {
	// 	const averageNdre = (items as TreeSurvey[]).reduce((sum: number, item: TreeSurvey) => sum + item.ndre, 0) / (items as TreeSurvey[]).length;
	// 	const averageNdvi = (items as TreeSurvey[]).reduce((sum: number, item: TreeSurvey) => sum + item.ndvi, 0) / (items as TreeSurvey[]).length;
	// 	return { name: key, ndre: averageNdre, ndvi: averageNdvi } as Average;
	// });

	const sortAverages = (a: Average, b: Average) => {
		if (sort == "ndre") {
			if (a.ndre < b.ndre) return -1;
			if (a.ndre > b.ndre) return 1;
		}
		if (sort == "ndvi") {
			if (a.ndvi < b.ndvi) return -1;
			if (a.ndvi > b.ndvi) return 1;
		}
		return 0;
	};

	return (
		<div>
			<div>
				<h1>Name: {farm?.name} {`(${params.id})`}</h1>
				<h3>Orchard Count: {farm?.orchard_count}</h3>
				<h3>Total Hectares: {farm?.total_hectares}</h3>
				<h3>User: {farm?.user_id}</h3>
				<h3>Orchard Count: {farm?.orchard_count}</h3>
			</div>
			<div>
				NDVI: {Math.round(orchardSurveys.reduce((acc, curr) => acc + curr.ndvi, 0) / orchardSurveys.length * 1000) / 1000}
			</div>
			<div>
				NDRE: {Math.round(orchardSurveys.reduce((acc, curr) => acc + curr.ndre, 0) / orchardSurveys.length * 1000) / 1000}
			</div>
			<div>
				<BarChart
					width={1000}
					height={500}
					data={orchardSurveys.map((orchardSurvey) => ({ ndvi: orchardSurvey.ndvi, ndre: orchardSurvey.ndre, lat: orchardSurvey.lat, lng: orchardSurvey.lng })).sort(sortAverages)} // very ugly
				// data={averages.sort(sortAverages)} // only relatively ugly
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<ReferenceLine name={"NDVI Average"} y={Math.round(orchardSurveys.reduce((acc, curr) => acc + curr.ndvi, 0) / orchardSurveys.length * 1000) / 1000} stroke="#000" />
					<ReferenceLine name={"NDRE Average"} y={Math.round(orchardSurveys.reduce((acc, curr) => acc + curr.ndre, 0) / orchardSurveys.length * 1000) / 1000} stroke="#000" />
					<Brush dataKey="name" height={30} stroke="#8884d8" />
					<Bar dataKey="ndvi" fill="#8884d8" />
					<Bar dataKey="ndre" fill="#82ca9d" />
				</BarChart>
			</div>
		</div>
	);
};