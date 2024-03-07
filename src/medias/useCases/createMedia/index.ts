import { CreateMediaController } from "./createMediaController";
import { CreateMediaUseCase } from "./createMediaUseCase";
import { mediaRepo } from "../../repos";
import { CloudinaryService } from "../../../core/services/CloudinaryService";

const cloudinaryService = new CloudinaryService();
const createMediaUseCase = new CreateMediaUseCase(mediaRepo, cloudinaryService);
const createMediaController = new CreateMediaController(createMediaUseCase);

export { createMediaController, createMediaUseCase };
