import { fetchExponentialBackoff } from "../../api/ExponentialBackoff";

const mockFnSuccess = async (): Promise<any> => {
	return { status: "success" }
};

const mockFnFail = async (): Promise<string> => {
	throw new Error("Simulated failure");
};

describe("fetchExponentialBackoff", () => {
	it("should successfully execute the function on the first attempt", async () => {
		const result = await fetchExponentialBackoff(mockFnSuccess);
		expect(JSON.stringify(result)).toBe(JSON.stringify({ status: "success" }));
	});

	it("should retry the function with exponential backoff on failure", async () => {
		const spy = jest.spyOn(console, 'debug').mockImplementation(() => { });
		try {
			await fetchExponentialBackoff(mockFnFail, { maxAttempts: 4, baseDelayMs: 250 });
		} catch (error: any) {
			expect(error.message).toBe('Simulated failure');
		}
		expect(spy).toHaveBeenCalledWith('Retry attempt 1 after 500ms');
		expect(spy).toHaveBeenCalledWith('Retry attempt 2 after 1000ms');
		expect(spy).toHaveBeenCalledWith('Retry attempt 3 after 2000ms');
		spy.mockRestore();
	});

	it("should stop retrying after reaching the maximum number of attempts", async () => {
		await expect(fetchExponentialBackoff(mockFnFail, { maxAttempts: 3, baseDelayMs: 250 })).rejects.toThrow("Simulated failure");
	});
});