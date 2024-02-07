import { Router } from "express";
import { imageRouter } from "../../images/http/routes";

const v1Router = Router();

v1Router.use("/image", imageRouter);


export { v1Router };