jest.mock("cloudinary", () => {
    return {
        v2: {
            config: jest.fn(),
            uploader: {
                upload: jest.fn(() => {
                    return { 
                        format: "jpg",
                        created_at: "12/09/2001",
                        filename: "est-image-file",
                        resource_type: SUPPORTED_MEDIA_TYPE.APPLICATION,
                        url: "http://github", 
                     };
                }),
            }
        }
    }
})

import  cloudinary from "cloudinary";
import { CloudinaryService } from "../CloudinaryService";
import { fromBufferToBase64 } from "../../helpers/types/file";
import { SUPPORTED_MEDIA_TYPE } from "../../../medias/domain/types";

describe("Cloudinary Service", () => {
    const cloudinaryService = new CloudinaryService();

    describe("Save media", () => {
        const file = {
            mimetype: "image/jpg",
            name: "test-image-file",
            encoding: "utf-8",
            size: 350749,
            data: Buffer.from("", "utf-8"),
        };

        it("should save when the media is provided", async () => {
            await cloudinaryService.save({ file: file });
            expect(cloudinary.v2.config).toHaveBeenCalledTimes(1);
            expect(cloudinary.v2.uploader.upload).toHaveBeenCalledTimes(1);
            expect(cloudinary.v2.uploader.upload).toHaveBeenCalledWith(
                fromBufferToBase64(Buffer.from("", "utf-8"), "image/jpg"),
                {
                    use_filename: true,
                    unique_filename: false,
                    overwrite: true,
                }
            );
        });
    })
});