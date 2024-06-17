import { render, waitFor } from "@testing-library/react";
import { App } from "../App";
import { MemoryRouter } from "react-router-dom";
import * as farms from "../api/Farms";
import * as orchards from "../api/Orchards";
import * as survey from "../api/Survey";
import { allFarms } from "./mocks/Farms.mocks";
import { allOrchards } from "./mocks/Orchards.mocks";
import { allSurveys } from "./mocks/Surveys.mocks";

describe("App Tests", () => {
	it("Check that app renders correctly", async () => {
		jest.spyOn(farms, "getAllFarms").mockResolvedValue(allFarms);
		jest.spyOn(orchards, "getAllOrchards").mockResolvedValue(allOrchards);
		jest.spyOn(survey, "getAllSurveys").mockResolvedValue(allSurveys);

		const { findByTestId } = render(
			<MemoryRouter initialEntries={["/"]}>
				<App />
			</MemoryRouter>
		);
		const app = await waitFor(() => findByTestId(/app/i));

		expect(app).toMatchSnapshot();
	});
});