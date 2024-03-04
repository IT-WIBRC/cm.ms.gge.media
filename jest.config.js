module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    setupFiles: ["dotenv/config"],
    testMatch: ["**/*.spec.ts"],
};