// const path = require('path');
import path from 'path';


console.log('setup file path is ', path.join(__dirname, "./jest.setup.ts"));
/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: "node",
    transform: {
        "^.+\.tsx?$": ["ts-jest",{}],
    },
    testMatch: ["**/test/**/*.test.ts"],
    setupFiles : [path.join(__dirname, "./jest.setup.ts")],
    verbose: true,
    forceExit: true,
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true
};