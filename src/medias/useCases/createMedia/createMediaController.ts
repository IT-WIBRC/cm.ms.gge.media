
import { BaseController } from "../../../core/infra/BaseController";
import { CreateMediaUseCase } from "./createMediaUseCase";
import { CreateMediaErrors } from "./createMediaError";
import { UploadedFile } from "express-fileupload";

export class CreateMediaController extends BaseController {
  private useCase: CreateMediaUseCase;

  constructor (useCase: CreateMediaUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (): Promise<any> {
    const description = this.req.body.description;
    const fileUploaded = this.req.files.media as UploadedFile;
    
    try {
      const result = await this.useCase.execute({
        link: "",
        type: fileUploaded.mimetype.split("/")[0].toUpperCase(),
        file: {
          ...fileUploaded,
        },
        description,
      });
      

    //   if (result.isLeft()) {
    //     const error = result.value;
  
        switch (error.constructor) {
          case CreateMediaErrors.NoMediaUploaded:
            return this.clientError(error.errorValue().message)
          default:
            return this.fail(error.errorValue().message);
        }
      } else {
        return this.ok(this.res);
      }

    } catch (err) {
      return this.fail(err)
    }
  }
}