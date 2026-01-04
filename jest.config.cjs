/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.test.ts", "**/__tests__/**/*.test.tsx"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
          module: "esnext",
          target: "esnext",
          allowImportingTsExtensions: true,
          moduleResolution: "node",
          verbatimModuleSyntax: false,
        },
      },
    ],
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.tsx$": "$1.tsx",
    "^(\\.{1,2}/.*)\\.ts$": "$1.ts",
  },
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup.ts"],
  collectCoverageFrom: ["src/SimpleLoadMore.tsx"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};

module.exports = config;
