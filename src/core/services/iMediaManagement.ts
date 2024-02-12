import { IFileUploaded } from "../helpers/types/IFileUploaded";

export interface IMedia {
    file: IFileUploaded;
}

export interface IMediaManagement {
    save(media: IMedia): Promise<any>;
}