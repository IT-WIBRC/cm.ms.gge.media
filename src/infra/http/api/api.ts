import { Router } from "express";
import { imageRouter } from "../../../medias/infra/http/routes";

const v1Router = Router();

v1Router.use("/media", imageRouter);


export { v1Router };