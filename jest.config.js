/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Para que funcionen los imports con "@"
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest', // Transforma TypeScript con Babel
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  reporters: [
    'default',
    ['jest-html-reporter', {
      pageTitle: 'Reporte de Pruebas',
      outputPath: './reports/test-report.html',
      includeFailureMsg: true,
      includeConsoleLog: true
    }]
  ],
  collectCoverage: true,
  coverageDirectory: './reports/coverage',
  coverageReporters: ['text', 'lcov'],
};

module.exports = config;
