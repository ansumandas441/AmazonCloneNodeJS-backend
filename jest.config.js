export default {
  // other Jest configurations...
  preset: 'ts-jest',
  testEnvironment: 'node',
  type: 'module',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  testPathIgnorePatterns: [
    '/node_modules/', // Ignore all files inside node_modules directory
    './test/mochaTest/*', // Ignore a specific file
  ],
};