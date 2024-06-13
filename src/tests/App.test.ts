import fetch from "jest-fetch-mock";
import { render, waitFor } from "@testing-library/react";
import App from "../App";

describe("App Tests", () => {
	beforeEach(() => {
		fetch.resetMocks();
	});

	it("Check that app renders correctly", async () => {
		const { findByTestId } = render(App());
		const page = await waitFor(() => findByTestId(/app/i));

		expect(page).toMatchSnapshot();
	});
});