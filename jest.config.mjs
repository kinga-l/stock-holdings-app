import presets from 'jest-preset-angular/presets/index.js';

/** @type {import('jest').Config} */
export default {
  ...presets.createCjsPreset(),
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!(@angular|jest-preset-angular|zone.js|@testing-library|primeng|@primeuix|ng2-charts|chart.js|@ctrl))',
  ],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@env/(.*)$': '<rootDir>/src/environments/$1',
  },
  collectCoverageFrom: ['src/app/**/*.ts', '!src/app/**/*.spec.ts', '!src/main.ts'],
};
