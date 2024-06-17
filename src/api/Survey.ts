import { OrchardSurvey, Surveys } from "../interfaces/Survey";

const authToken = process.env.VITE_REACT_APP_AUTH_TOKEN;

const headers: HeadersInit = {
	"Accept": "application/json",
	"Authorization": authToken || ""
};

// TODO: Add params
export const getAllSurveys = async (): Promise<Surveys> => {
	const result: Surveys = await fetch(
		"/farming/surveys/",
		{
			method: "GET",
			headers: headers,
		})
		.then((response) => response.json());
	return result;
};

// TODO: Add params
export const getSurveyById = async (survey_id: number): Promise<OrchardSurvey> => {
	const result: OrchardSurvey = await fetch(
		`/farming/surveys/${survey_id}/tree_surveys/`,
		{
			method: "GET",
			headers: headers,
		})
		.then((response) => response.json());
	return result;
};
