import { UniqueEntityID } from "../../../../core/domain/UniqueEntityID";
import { Result } from "../../../../core/logic/Result";
import { Media } from "../../../domain/media";
import { SUPPORTED_MEDIA_TYPE } from "../../../domain/types";
import { MediaType } from "../../../domain/valueObjects/mediaType";
import { MediaRepo } from "../../../repos/mediaRepo";
import { CreateMediaDTO } from "../../../useCases/createMedia/createMediaDTO";
import { CreateMediaUseCase } from "../../../useCases/createMedia/createMediaUseCase";
import { mediaRepo, CloudinaryServiceStub, stubModels } from "../../mocks";

describe("CreateMediaUseCase", () => {
  const cloudinaryServiceStub = new CloudinaryServiceStub();
  const createMediaUseCase = new CreateMediaUseCase(
    mediaRepo,
    cloudinaryServiceStub,
  );
  const baseRequest = {
    type: "IMAGE",
    description: "Here is the image",
    file: {
      name: "test image",
      data: Buffer.from(""),
      mimetype: "image/jpg",
      size: 189098,
      encoding: "utf-8",
    },
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should return an error message when the file type is not supported", async () => {
    const request = {
      ...baseRequest,
      type: "AUDIO",
    };

    const unsupportedFileType = await createMediaUseCase.execute(
      request as CreateMediaDTO,
    );
    expect(unsupportedFileType.isLeft()).toBe(true);
    expect(unsupportedFileType.value.isFailure).toBe(true);
    expect(unsupportedFileType.value.errorValue()).toBe(
      "Unknown the media type 'AUDIO'",
    );
  });

  it("should return an error message when the service has failed to persist the file", async () => {
    const cloudinaryServiceStub = new CloudinaryServiceStub();
    cloudinaryServiceStub.save = jest
      .fn()
      .mockResolvedValueOnce(Result.fail("Internal error. Contact support."));

    const createMediaUseCase = new CreateMediaUseCase(
      mediaRepo,
      cloudinaryServiceStub,
    );
    const serviceFailedToPersist = await createMediaUseCase.execute(
      baseRequest as CreateMediaDTO,
    );
    expect(serviceFailedToPersist.isLeft()).toBe(true);
    expect(serviceFailedToPersist.value.isFailure).toBe(true);
    expect(serviceFailedToPersist.value.errorValue()).toBe(
      "Error encounter when saving file",
    );
  });

  it("should return an error message when the all the required values are not provided", async () => {
    const cloudinaryServiceStub = new CloudinaryServiceStub();
    cloudinaryServiceStub.save = jest.fn().mockResolvedValueOnce(
      Result.ok({
        url: "",
        filename: "files-name",
      }),
    );

    const createMediaUseCase = new CreateMediaUseCase(
      mediaRepo,
      cloudinaryServiceStub,
    );
    const serviceFailedToPersist = await createMediaUseCase.execute(
      baseRequest as CreateMediaDTO,
    );
    expect(serviceFailedToPersist.isLeft()).toBe(true);
    expect(serviceFailedToPersist.value.isFailure).toBe(true);
    expect(serviceFailedToPersist.value.errorValue()).toBe(
      "Error encounter when saving file to provider",
    );
  });

  it("should return an error message when the file informations failed to be persist in database", async () => {
    const mediaRepoStub = new MediaRepo(stubModels);
    const cloudinaryServiceStub = new CloudinaryServiceStub();
    cloudinaryServiceStub.save = jest.fn().mockResolvedValueOnce(
      Result.ok({
        url: "https://cloudinary.com/documentation/upload_images",
        filename: "files-name",
      }),
    );
    mediaRepoStub.save = jest.fn().mockRejectedValueOnce("Rejected");

    const createMediaUseCase = new CreateMediaUseCase(
      mediaRepoStub,
      cloudinaryServiceStub,
    );
    const serviceFailedToPersist = await createMediaUseCase.execute(
      baseRequest as CreateMediaDTO,
    );
    expect(serviceFailedToPersist.isLeft()).toBe(true);
    expect(serviceFailedToPersist.value.errorValue()?.message).toBe(
      "An unexpected error occurred.",
    );
  });

  it("should return nothing whe all fields are well provided and service works", async () => {
    const mediaId = "6a133e20-277f-4f45-bfdf-957ba89f5838";

    const mediaRepoStub = new MediaRepo(stubModels);
    const cloudinaryServiceStub = new CloudinaryServiceStub();
    cloudinaryServiceStub.save = jest.fn().mockResolvedValueOnce(
      Result.ok({
        url: "https://cloudinary.com/documentation/upload_images",
        filename: "files-name",
      }),
    );
    mediaRepoStub.save = jest.fn().mockResolvedValueOnce("Accepted");

    const createMediaUseCase = new CreateMediaUseCase(
      mediaRepoStub,
      cloudinaryServiceStub,
    );
    const serviceFailedToPersist = await createMediaUseCase.execute(
      baseRequest as CreateMediaDTO,
    );

    expect(cloudinaryServiceStub.save).toHaveBeenCalledTimes(1);
    expect(cloudinaryServiceStub.save).toHaveBeenCalledWith({
      file: {
        data: Buffer.from(""),
        encoding: "utf-8",
        mimetype: "image/jpg",
        name: "test image",
        size: 189098,
      },
    });

    expect(mediaRepoStub.save).toHaveBeenCalledTimes(1);
    expect(mediaRepoStub.save).toHaveBeenCalledWith(
      Media.create(
        {
          link: "https://cloudinary.com/documentation/upload_images",
          name: "files-name",
          type: MediaType.create(SUPPORTED_MEDIA_TYPE.IMAGE).getValue(),
          description: "Here is the image",
        },
        new UniqueEntityID(mediaId),
      ).getValue(),
    );

    expect(serviceFailedToPersist.isRight()).toBe(true);
    expect(serviceFailedToPersist.value.errorValue()).toBeNull();
  });
});
