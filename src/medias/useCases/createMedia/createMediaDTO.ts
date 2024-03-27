import { IFileUploaded } from "../../../core/helpers/types/IFileUploaded";

export interface CreateMediaDTO {
    file: IFileUploaded;
    description?: string;
  }