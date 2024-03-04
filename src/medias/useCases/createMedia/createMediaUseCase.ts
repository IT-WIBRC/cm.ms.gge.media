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
  CreateMediaErrors.NoMediaUploaded |
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

    const mediaTypeOrError = MediaType.create(type);

    if (mediaTypeOrError.isFailure) {
      return left(Result.fail<void>(mediaTypeOrError.error)) as Response;
    }
 
    const fileUploaded = await this.mediaManagementService.save({
      file,
    });

    if (fileUploaded.isFailure) {
      //TODO: create a log for this
      return left(Result.fail<void>(
        "Error encounter when saving file")) as Response;
    }

    const { url, filename } = fileUploaded.getValue();

    const mediaOrError = Media.create({
      type: mediaTypeOrError.getValue(),
      description,
      link: url,
      name: filename ?? file.name,
    });

    if (mediaOrError.isFailure) {
      //TODO: create a log for this
      return left(Result.fail<void>("Error encounter when saving file to provider")) as Response;
    }

    const media: Media = mediaOrError.getValue();

    try {
      await this.mediaRepo.save(media);
    } catch (error: unknown) {
      //TODO: create a log for this
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }

    return right(Result.ok<void>()) as Response;
  }
}