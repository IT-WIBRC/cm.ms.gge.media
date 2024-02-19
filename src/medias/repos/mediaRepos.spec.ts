import { Media } from "../domain/media";
import { MediaType } from "../domain/valueObjects/mediaType";
import { MediaMap } from "../mappers/MediaMap";
import { MediaRepo } from "./mediaRepo";

describe("MediaRepo", () => {
    const stubModels = {
        Media: {
            save: jest.fn(),
        },  
    };

    it("should save the media be successful when the 'save' method is called", async () => {
        const media = Media.create({
            type: MediaType.create("IMAGE").getValue(),
            link: "https://cloudinary",
            name: "wibrc-image",
        }).getValue();

        const mediaRepo = new MediaRepo(stubModels);
        await mediaRepo.save(media);
        expect(stubModels.Media.save).toHaveBeenCalledTimes(1);
        expect(stubModels.Media.save).toHaveBeenCalledWith(MediaMap.toPersistence(media));
    });
});