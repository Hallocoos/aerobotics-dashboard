import { TreeSurvey } from "../interfaces/Survey";
import { GroupOfCoords } from "../pages/FarmOverview";

export const getFirstFourDigits = (number: number) => {
	return Math.round(number * 10000) / 10000;
};

export const groupByCoordinates = (data: TreeSurvey[]) => {
	return data.reduce((groups: GroupOfCoords, item) => {
		const key = `${getFirstFourDigits(item.lat)}_${getFirstFourDigits(item.lng)}`;
		if (!groups[key]) groups[key] = [];
		groups[key].push({ ...item });
		return groups;
	}, {});
};