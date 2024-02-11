import { UseCase } from "../../../core/domain/UseCase";
import { CreateMediaDTO } from "./createMediaDTO";
import { Either, Result, left, right } from "../../../core/logic/Result";
import { IMediaRepo } from "../../repos/mediaRepo";
import { CreateMediaErrors } from "./createMediaError";
import { GenericAppError } from "../../../core/logic/AppError";
import { MediaType } from "../../domain/valueObjects/mediaType";
import { Media } from "../../domain/media";

type Response = Either<
  GenericAppError.UnexpectedError |
  CreateMediaErrors.ServiceError |
  Result<any>, 
  Result<void>
>

export class CreateMediaUseCase implements UseCase<CreateMediaDTO, Promise<Response>> {
  private mediaRepo: IMediaRepo;

  constructor (mediaRepo: IMediaRepo) {
    this.mediaRepo = mediaRepo;
  }

  async execute (req: CreateMediaDTO): Promise<Response> {
    const { type, description } = req;

    const mediaTypeOrError = MediaType.create(type);

    if (mediaTypeOrError.isFailure) {
      return left(Result.fail<void>(mediaTypeOrError.error)) as Response;
    }

    const mediaOrError = Media.create({
      type: mediaTypeOrError.getValue(),
      description,
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