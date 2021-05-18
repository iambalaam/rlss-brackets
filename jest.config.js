module.exports = {
  rootDir: "./",
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "\\.css$": "<rootDir>/styleMock.js"
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.test.json'
    }
  }
};