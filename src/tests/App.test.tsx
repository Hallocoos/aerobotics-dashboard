import { render, waitFor } from "@testing-library/react";
import { App } from "../App";
import { MemoryRouter } from "react-router-dom";

describe("App Tests", () => {
	it("Check that app renders correctly", async () => {
		const { findByTestId } = render(
			<MemoryRouter initialEntries={["/"]}>
				<App />
			</MemoryRouter>
		);
		const app = await waitFor(() => findByTestId(/app/i));

		expect(app).toMatchSnapshot();
	});
});