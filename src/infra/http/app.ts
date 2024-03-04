import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import fileUpload from "express-fileupload";
import { isProduction } from '../../config';
import { v1Router }  from "./api/api";

const app = express();

const { 
  MAX_FILE_SIZE,
  MAX_FILE_NAME_SIZE,
} = process.env;

const origin = {
  origin: isProduction ? 'production link' : '*',
}

const fileUploadOptions = {
  safeFileNames: true,
  preserveExtension: true,
  abortOnLimit: true,
  responseOnLimit: `File too big (max size = ${MAX_FILE_NAME_SIZE ?? "1MB"})`,
  parseNested: true, // parse it to JSON
  debug: true,
  limits: { 
    fileSize: Number(MAX_FILE_SIZE) ?? 1048576,
    files: 1,
    fieldNameSize: Number(MAX_FILE_NAME_SIZE) ?? 50,
   },
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(origin));
app.use(compression());
app.use(helmet());
app.use(fileUpload(fileUploadOptions));
app.use(morgan('combined'));

app.use("/api/v1", v1Router);

export { app };