import { createDefaultEsmPreset } from "ts-jest";

export default {
  ...createDefaultEsmPreset({
    tsconfig: "./tsconfig.json",
  }),
  testEnvironment: "node",
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};
