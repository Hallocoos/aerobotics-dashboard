import { Bins, Farm, Farms, FruitSize } from "../interfaces/Farm";


const authToken = process.env.VITE_REACT_APP_AUTH_TOKEN;

const headers: HeadersInit = {
	"Accept": "application/json",
	"Authorization": authToken || ""
};

export const getAllFarms = async (): Promise<Farms> => {
	const result: Farms = await fetch(
		"/farming/farms",
		{
			method: "GET",
			headers: headers,
		})
		.then((response) => response.json());
	return result;
};

// TODO: Add params
export const getFarmById = async (farm_id: number): Promise<Farm> => {
	const result: Farm = await fetch(
		`/farming/farms/${farm_id}`,
		{
			method: "GET",
			headers: headers,
		})
		.then((response) => response.json());
	return result;
};

// TODO: Add params
export const getFarmBinsByFarmId = async (farm_id: number): Promise<Bins> => {
	const result: Bins = await fetch(
		`/farming/farms/${farm_id}/bins/`,
		{
			method: "GET",
			headers: headers,
		})
		.then((response) => response.json());
	return result;
};

// TODO: Add params
export const getFruitSizesByFarmId = async (farm_id: number): Promise<FruitSize> => {
	const result: FruitSize = await fetch(
		`/farming/farms/${farm_id}/fruit_sizes?`,
		{
			method: "GET",
			headers: headers,
		})
		.then((response) => response.json());
	return result;
};