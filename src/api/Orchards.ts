import { Orchard, Orchards } from "../interfaces/Orchard";

const authToken = process.env.VITE_REACT_APP_AUTH_TOKEN;

const headers: HeadersInit = {
	"Accept": "application/json",
	"Authorization": authToken || ""
};

// TODO: Add params
export const getAllOrchards = async (): Promise<Orchards> => {
	const result: Orchards = await fetch(
		"/farming/orchards/",
		{
			method: "GET",
			headers: headers,
		})
		.then((response) => response.json());
	return result;
};

// TODO: Add params
export const getOrchardById = async (id: number): Promise<Orchard> => {
	const result: Orchard = await fetch(
		`/farming/orchards/${id}/`,
		{
			method: "GET",
			headers: headers,
		})
		.then((response) => response.json());
	return result;
};

