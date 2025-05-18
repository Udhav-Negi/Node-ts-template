import path from 'path';

/** @type {import('ts-jest').JestConfigWithTsJest} **/
// module.exports = {
export default {
    testEnvironment: "node",
    transform: {
        // eslint-disable-next-line no-useless-escape
        "^.+\.tsx?$": ["ts-jest",{}],
    },
    testMatch: ["**/test/**/*.test.ts"],
    // eslint-disable-next-line no-undef
    setupFiles : [path.join(__dirname, "./jest.setup.ts")],
    verbose: true,
    forceExit: true,
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true
};