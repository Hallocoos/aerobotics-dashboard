import { Farms } from "../interfaces/Api";

const authToken = process.env.VITE_REACT_APP_AUTH_TOKEN;

const headers: HeadersInit = {
	"Accept": "application/json",
	"Authorization": authToken || ""
};

export const getFarms = async (): Promise<Farms> => {
	const result: Farms = await fetch(
		"/farming/farms",
		{
			method: "GET",
			headers: headers,
		})
		.then((response) => response.json());

	return result;
};