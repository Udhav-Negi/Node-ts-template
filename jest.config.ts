import path from 'path';

/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
    testEnvironment: "node",
    // transform: {
    //     // eslint-disable-next-line no-useless-escape
    //     "^.+\.tsx?$": ["ts-jest",{}],
    // },
    testMatch: ["**/tests/**/*.test.ts", "**/tests/**/*.test.js"],
    setupFiles : [path.join(process.cwd(), "./jest.setup.js")],
    verbose: true,
    forceExit: true,
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,
    // collectCoverage: true,
    // collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
    // coverageThreshold: {
    // global: {
    //   branches: 80,
    //   functions: 80,
    //   lines: 80,
    //   statements: 80,
    // },
//   },
};