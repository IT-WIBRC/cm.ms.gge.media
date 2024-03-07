import { Router } from "express";
import { createMediaController } from "../../../useCases/createMedia";

const imageRouter = Router();

imageRouter.post("/add", (request, response) =>
  createMediaController.execute(request, response),
);

export { imageRouter };
