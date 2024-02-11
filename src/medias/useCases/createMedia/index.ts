import { CreateMediaController } from "./createMediaController";
import { CreateMediaUseCase } from "./createMediaUseCase";
import { mediaRepo } from "../../repos";

const createMediaUseCase = new CreateMediaUseCase(mediaRepo);
const createMediaController = new CreateMediaController(createMediaUseCase);

export {
    createMediaController,
    createMediaUseCase,
};

