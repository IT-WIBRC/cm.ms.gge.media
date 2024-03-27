import { Router } from "express";
import { mediaRouter } from "../../../medias/infra/http/routes";

const v1Router = Router();

v1Router.use("/media", mediaRouter);


export { v1Router };