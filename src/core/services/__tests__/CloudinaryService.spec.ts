import { CloudinaryService } from "../CloudinaryService";
import cloudinary from "../../../../__mocks__/cloudinary";
import { fromBufferToCustomBase64 } from "../../helpers/file";

describe("Cloudinary Service", () => {
    let cloudinaryService: CloudinaryService;

    beforeEach(() => {
        cloudinaryService = new CloudinaryService();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    afterAll(()=> {
        jest.clearAllMocks();
    });

    describe("Save media", () => {
        const buffer = Buffer.from("1234", "base64url");
        const file = {
            mimetype: "image/jpg",
            name: "test-image-file",
            encoding: "utf-8",
            size: 350749,
            data: buffer,
        };

        it("should save when the media is provided", async () => {
            await cloudinaryService.save({ file: file });
            expect(cloudinary.v2.config).toHaveBeenCalledTimes(1);
            expect(cloudinary.v2.uploader.upload).toHaveBeenCalledTimes(1);
            expect(cloudinary.v2.uploader.upload).toHaveBeenCalledWith(
                fromBufferToCustomBase64(buffer, "image/jpg"),
                {
                    use_filename: true,
                    unique_filename: false,
                    overwrite: true,
                }
            );
            expect(cloudinary.v2.uploader.upload).toHaveReturned();
        });
    })
});