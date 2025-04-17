import nextJest from 'next/jest';
import crypto from 'crypto';

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  globals: {
    crypto: crypto,
    "ts-jest": {
      isolatedModules: true,
      tsconfig: "tsconfig.spec.json",
    },
  },
  moduleNameMapper: {
    "^@/((?!__tests__).*)$": "<rootDir>/src/$1",
    "^@/__tests__/(.*)$": "<rootDir>/__tests__/$1",
  },
  setupFiles: ["jest-canvas-mock"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: [
    "<rootDir>/.cache/",
    "<rootDir>/__tests__/__helpers__/",
  ],
  testTimeout: 10000,
};

module.exports = async () => ({
  ...(await createJestConfig(customJestConfig)()),
  transformIgnorePatterns: [
    "(?!(/node_modules/(nanoid|react-markdown|trim-lines|vfile|vfile-message|unist-.*|unified|bail|is-plain-obj|trough|remark-.*|mdast-util-.*|micromark.*|decode-named-character-reference|character-entities|property-information|hast-util-whitespace|space-separated-tokens|comma-separated-tokens|pretty-bytes)/))(/node_modules/.+.(js|jsx|mjs|cjs|ts|tsx)$)",
  ],
});
