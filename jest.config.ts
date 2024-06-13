import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
	verbose: true,
	testPathIgnorePatterns: ["<rootDir>/src/tests/mock", "<rootDir>/node_modules"],
	setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
	collectCoverage: true,
	coverageDirectory: "<rootDir>/test-coverage",
	coveragePathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/e2e-tests", "<rootDir>/src/tests"],
	coverageReporters: ["lcov", "text", "html"],
	watch: false,
	watchAll: false,
	preset: "ts-jest",
	testEnvironment: "jsdom",
	testMatch: [
		"<rootDir>/src/tests/*.+(ts|tsx)",
		"<rootDir>/src/tests/**/*.+(ts|tsx)"
	],
	transform: {
		"^.+\\.(t|j)sx?$": "ts-jest",
	},
};
export default config;