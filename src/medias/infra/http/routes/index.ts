import { Router } from "express";
import { createMediaController } from "../../../useCases/createMedia";

const mediaRouter = Router();

mediaRouter.post("/add", (request, response) =>
  createMediaController.execute(request, response),
);

export { mediaRouter };
