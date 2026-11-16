/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/*.spec.ts'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx|mjs)$': ['ts-jest', {
      tsconfig: {
        module: 'CommonJS',
        target: 'ES2017',
        types: ['jest'],
        esModuleInterop: true,
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        useDefineForClassFields: false,
        strict: true,
        skipLibCheck: true,
      },
    }],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleNameMapper: {
    '^@open-dcp/services$': '<rootDir>/projects/open-dcp/angular-form/node_modules/@open-dcp/services/dist/index.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$|@angular|@open-dcp|ngx-permissions)',
  ],
};


