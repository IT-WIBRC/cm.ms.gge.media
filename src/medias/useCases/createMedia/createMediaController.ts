import { BaseController } from "../../../core/infra/BaseController";
import { CreateMediaUseCase } from "./createMediaUseCase";
import { CreateMediaErrors } from "./createMediaError";
import { UploadedFile } from "express-fileupload";
import { Result } from "../../../core/logic/Result";

export class CreateMediaController extends BaseController {
  private useCase: CreateMediaUseCase;

  constructor(useCase: CreateMediaUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(): Promise<unknown> {
    const description = this.req.body.description;
    const fileUploaded = this.req.files?.media as UploadedFile;

    if (!fileUploaded || Object.keys(fileUploaded).length === 0) {
      return this.clientError("No files were uploaded.");
    }
  
    try {
      const result = await this.useCase.execute({
        file: {
          ...fileUploaded,
        },
        description,
      });

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case CreateMediaErrors.NoMediaUploaded:
            return this.clientError(error.errorValue().message);
          default:
            return this.fail(error.errorValue().message);
        }
      } else {
        return this.created(this.res, (result as Result<string>).getValue());
      }
    } catch (err) {
      return this.fail(err);
    }
  }
}
