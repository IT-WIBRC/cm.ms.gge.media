import { IFileUploaded } from "../../../core/helpers/types/IFileUploaded";

export interface CreateMediaDTO {
    link: string;
    type: string;
    file: IFileUploaded;
    description?: string;
  }