import { SUPPORTED_MEDIA_TYPE } from "../../medias/domain/types";
import { fromBufferToCustomBase64 } from "../helpers/file";
import { Result } from "../logic/Result";
import { IMedia, IMediaManagement, IMediaResponse } from "./iMediaManagement";
import cloudinary from "cloudinary";

type UploadApiOptions = cloudinary.UploadApiOptions;
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

interface ApiError {
  error: {
    message: string;
  };
}

export class CloudinaryService implements IMediaManagement {
  private cloudinaryProvider = cloudinary.v2;
  private uploadOptions: UploadApiOptions;

  public constructor() {
    this.cloudinaryProvider.config({
      secure: true,
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
    });

    this.uploadOptions = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };
  }

  async save(media: IMedia): Promise<Result<IMediaResponse>> {
    const { data, mimetype } = media.file;
    const dataURI = fromBufferToCustomBase64(data, mimetype);
    let result: Result<IMediaResponse>;

    try {
      const response = await this.cloudinaryProvider.uploader.upload(
        dataURI,
        this.uploadOptions,
      );

      result = Result.ok({
        format: response.format,
        resource_type:
          SUPPORTED_MEDIA_TYPE[response.resource_type.toUpperCase()],
        created_at: response.created_at,
        filename: response.original_filename,
        url: response.secure_url ?? response.url,
      });
    } catch (apiError: unknown) {
      result = Result.fail((apiError as ApiError).error.message);
    }

    return result;
  }
}
