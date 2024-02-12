import { UseCase } from "../../../core/domain/UseCase";
import { CreateMediaDTO } from "./createMediaDTO";
import { Either, Result, left, right } from "../../../core/logic/Result";
import { IMediaRepo } from "../../repos/mediaRepo";
import { CreateMediaErrors } from "./createMediaError";
import { GenericAppError } from "../../../core/logic/AppError";
import { MediaType } from "../../domain/valueObjects/mediaType";
import { Media } from "../../domain/media";
import { IMediaManagement } from "../../../core/services/iMediaManagement";

type Response = Either<
  GenericAppError.UnexpectedError |
  CreateMediaErrors.ServiceError |
  Result<any>, 
  Result<void>
>

export class CreateMediaUseCase implements UseCase<CreateMediaDTO, Promise<Response>> {
  private mediaRepo: IMediaRepo;
  private mediaManagementService: IMediaManagement;

  constructor (
    mediaRepo: IMediaRepo,
    mediaManagementService: IMediaManagement)
  {
    this.mediaRepo = mediaRepo;
    this.mediaManagementService = mediaManagementService;
  }

  async execute (req: CreateMediaDTO): Promise<Response> {
    const { type, description, file } = req;

    if (!file || Object.keys(file).length === 0) {
       return left(Result.fail<void>("No files were uploaded.")) as Response;
    }

    const mediaTypeOrError = MediaType.create(type);

    if (mediaTypeOrError.isFailure) {
      return left(Result.fail<void>(mediaTypeOrError.error)) as Response;
    }
 
    let fileUploaded: any;
    try {
      fileUploaded = await this.mediaManagementService.save({
        file,
      });
    } catch (error) {
      return left(Result.fail<void>(
        "Error encounter when saving file to cloudinary")) as Response;
    }

    const mediaOrError = Media.create({
      type: mediaTypeOrError.getValue(),
      description,
      link: fileUploaded.secure_url,
      name: fileUploaded.original_filename ?? file.name,
    });

    if (mediaOrError.isFailure) {
      return left(Result.fail<void>(mediaOrError.error)) as Response;
    }

    const media: Media = mediaOrError.getValue();

    try {
      await this.mediaRepo.save(media);
    } catch (err) {
      return left(new GenericAppError.UnexpectedError(err)) as Response;
    }

    return right(Result.ok<void>()) as Response;
  }
}