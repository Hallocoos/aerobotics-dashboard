export interface Farms {
	count: number;
	next?: unknown;
	previous?: unknown;
	results: FarmResults[]
}

export interface FarmResults {
	id: number;
	name: string;
	user_id: number;
	orchard_count: number;
	total_hectares: number;
}