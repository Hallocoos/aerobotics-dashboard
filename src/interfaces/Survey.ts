import { Base } from "./Common";

export interface Surveys extends Base {
	results: Survey[];
}

export interface Survey {
	id: number;
	orchard_id: number;
	date: string;
	hectares: number;
	polygon: string;
}

export interface OrchardSurvey extends Base {
	results: TreeSurvey[];
}

export interface TreeSurvey {
	id: number;
	lat: number;
	lng: number;
	ndre: number;
	ndvi: number;
	volume: number;
	area: number;
	row_index: number;
	tree_index: number;
}