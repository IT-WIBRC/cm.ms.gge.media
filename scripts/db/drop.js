const { dropDatabase } = require("typeorm-extension");
const { dbConfig } = require("./base");

(async () => {
await dropDatabase({
  ifExist: true,
  options: {
    ...dbConfig,
  },
});

process.exit(0);
})();