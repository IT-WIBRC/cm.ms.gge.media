import { IMedia, IMediaManagement } from "./iMediaManagement";
import cloudinary from "cloudinary";

type UploadApiOptions = cloudinary.UploadApiOptions;
const { 
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
 } = process.env;

export class CloudinaryService implements IMediaManagement {
    private cloudinaryProvider = cloudinary.v2;
    private uploadOptions: UploadApiOptions;

    public constructor(options?: UploadApiOptions) {
    
        this.cloudinaryProvider.config({
            secure: true,
            cloud_name: CLOUDINARY_CLOUD_NAME,
            api_key: CLOUDINARY_API_KEY,
            api_secret: CLOUDINARY_API_SECRET,
        });

        if (options) {
            this.uploadOptions = options;
        } else {
            this.uploadOptions = {
                use_filename: true,
                unique_filename: false,
                overwrite: true,
            }
        }
    }

    async save(media: IMedia): Promise<any> {
        const b64 = Buffer.from(media.file.data).toString("base64");
        let dataURI = "data:" + media.file.mimetype + ";base64," + b64;
        return this.cloudinaryProvider
            .uploader
            .upload(dataURI, this.uploadOptions);
    }
}