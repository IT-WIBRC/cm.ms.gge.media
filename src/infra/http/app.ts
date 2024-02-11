import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import fileUpload from "express-fileupload";
import { isProduction } from '../../config';
import { v1Router }  from "./api/api"

const app = express();

const origin = {
  origin: isProduction ? 'production link' : '*',
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(origin));
app.use(compression());
app.use(helmet());
app.use(fileUpload());
app.use(morgan('combined'));

app.use("/api/v1", v1Router);

export { app };