import "reflect-metadata";
import fs from "fs";
import path from "path";
import { databaseCredential } from "../config/config";
import { DataSource, Repository } from "typeorm";
import { isProduction } from "../../../config";

const { username, database, dialect, port } =
  databaseCredential;

const models = fs
  .readdirSync(path.resolve(__dirname, "./"))
  .filter(
    (t) => ~t.indexOf(".ts") && !~t.indexOf("index") && !~t.indexOf(".map"),
  )
  .map((model) => require(__dirname + "/" + model));

const modelNames = models.map((model) => Object.keys(model)[0]);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modelClass = models.map((model) => Object.values<any>(model)[0]);

console.log(modelClass);

const connection = new DataSource({
  type: dialect,
  port,
  username,
  password: `${process.env.DB_PASS}`,
  database,
  synchronize: !!isProduction,
  logging: !isProduction,
  entities: [`${__dirname}/**/typeorm/models/*.{ts,js}`],
  logger: "advanced-console",
  uuidExtension: "uuid-ossp",
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`]
});

type TypeOrmModelRepository = {
  [key: string]: Repository<unknown>;
};

const typeOrmModelRepositories: TypeOrmModelRepository = {};
modelNames.forEach((model, index) => {
  typeOrmModelRepositories[model] = connection.getRepository(modelClass[index]);
});

export { connection, typeOrmModelRepositories };
