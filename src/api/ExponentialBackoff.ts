/* eslint-disable @typescript-eslint/no-explicit-any */
type RetryFunction = (...args: any[]) => Promise<any>;
type RetryOptions = {
	maxAttempts: number;
	baseDelayMs: number;
};

export async function fetchExponentialBackoff(fn: RetryFunction, options: RetryOptions = { maxAttempts: 5, baseDelayMs: 1000 }): Promise<any> {
	let attempt = 1;

	const execute = async (): Promise<any> => {
		try {
			return await fn();
		} catch (error) {
			if (attempt >= options.maxAttempts) {
				throw error;
			}

			const delayMs = options.baseDelayMs * Math.pow(2, attempt);
			console.debug(`Retry attempt ${attempt} after ${delayMs}ms`);
			await new Promise((resolve) => setTimeout(resolve, delayMs));

			attempt++;
			return execute();
		}
	};
	return execute();
}
