import { Media } from "../domain/media";
import { MediaType } from "../domain/valueObjects/mediaType";
import { MediaRepo } from "../repos/mediaRepo";
import { IMedia, IMediaManagement, IMediaResponse } from "../../core/services/iMediaManagement";
import { Result } from "../../core/logic/Result";

export const mediaEntityStub = Media.create({
    type: MediaType.create("IMAGE").getValue(),
    link: "https://cloudinary",
    name: "wibrc-image",
    description: "Here is the description",
}).getValue();


export const stubModels = {
    Media: {
        save: jest.fn(),
    },  
};

export const mediaRepo = new MediaRepo(stubModels);

export class CloudinaryServiceStub implements IMediaManagement {
    save(media: IMedia): Promise<Result<IMediaResponse>> {
        throw new Error("Method not implemented.");
    }
}