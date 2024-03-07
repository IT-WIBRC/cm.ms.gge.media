import { MediaRepo } from "./mediaRepo";
import { typeOrmModelRepositories } from "../../infra/typeorm/models";

const mediaRepo = new MediaRepo(typeOrmModelRepositories);

export { mediaRepo };
