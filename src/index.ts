import { config } from "dotenv";
config();

import { app } from "./infra/http/app";
// import { connection } from "./infra/typeorm/models";

(async function () {
try {
    // await connection.initialize();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`[App]: Server listening on ${PORT}`);
  });
} catch (error: unknown) {
  console.log(
    "Server has not started due to : ",
    (error as { message: string }).message,
  );
}
})();
