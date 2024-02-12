const { createDatabase } = require("typeorm-extension");
const { dbConfig } = require("./base");

(async () => {
    await createDatabase({
         ifNotExist: true,
         options: {
            ...dbConfig,
         },
    });

    process.exit(0);
})();