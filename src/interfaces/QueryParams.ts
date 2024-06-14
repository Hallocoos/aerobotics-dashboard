
export interface FruitSizeParams {
	limit: number;
	offset: number;
	data_type: string;
	captured_at__gte: Date;
	captured_at__lte: Date;
	processed_at__gte: Date;
	processed_at__lte: Date;
}

export interface BinParams {
	limit: number
	offset: number
}

export interface FarmParams {
	id: number;
	id__in: number;
	limit: number;
	offset: number;
}