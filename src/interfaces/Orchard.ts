import { Base } from "./Common";

export interface Orchards extends Base {
	results: Orchard[];
}

export interface Orchard {
	id: number;
	name: string;
	farm_id: number;
	crop_type_name: string;
	polygon: string;
	hectares: number;
	cultivar_name: string;
}