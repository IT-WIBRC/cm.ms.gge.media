import { SUPPORTED_MEDIA_TYPE } from "../../domain/types";

export interface CreateMediaDTO {
    link: string;
    type: SUPPORTED_MEDIA_TYPE;
    description?: string;
  }