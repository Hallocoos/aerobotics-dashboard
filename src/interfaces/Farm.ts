import { Base } from "./Common";

export interface Farms extends Base {
	results: Farm[]
}

export interface Farm {
	id: number;
	name: string;
	user_id: number;
	orchard_count: number;
	total_hectares: number;
}

export interface Bins extends Base {
	results: Bin[]
}

export interface Bin {
	id: number;
	farm_id: number;
	orchard_id: number;
	external_id: string;
}

export interface FruitSize {
	id: number;
	size_mm: number;
	captured_at: string;
	processed_at: string;
	year: number;
	week: number;
	orchard_id: number;
	farm_id: number;
	latitude: number;
	longitude: number;
	bin_id: number;
}
