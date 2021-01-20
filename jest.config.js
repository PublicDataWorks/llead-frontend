module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleDirectories: ['src', 'node_modules'],
  testPathIgnorePatterns: ['node_modules/', 'cypress/', 'integration-tests/'],
  setupFilesAfterEnv: ['jest-sinon', './test/setup.js'],
}
