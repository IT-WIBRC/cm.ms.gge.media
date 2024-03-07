import { SUPPORTED_MEDIA_TYPE } from "../../medias/domain/types";
import { IFileUploaded } from "../helpers/types/IFileUploaded";
import { Result } from "../logic/Result";

export interface IMedia {
  file: IFileUploaded;
}

export interface IMediaResponse {
  format: string;
  resource_type: SUPPORTED_MEDIA_TYPE;
  created_at: string;
  filename: string;
  url: string;
}

export interface IMediaManagement {
  save(media: IMedia): Promise<Result<IMediaResponse>>;
}
