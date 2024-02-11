
import { BaseController } from "../../../core/infra/BaseController";
import { CreateMediaUseCase } from "./createMediaUseCase";
import { CreateMediaDTO } from "./createMediaDTO";
import { CreateMediaErrors } from "./createMediaError";

export class CreateMediaController extends BaseController {
  private useCase: CreateMediaUseCase;

  constructor (useCase: CreateMediaUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (): Promise<any> {
    //change the DTO according to the file's data that will be uploaded
    const dto: CreateMediaDTO = this.req.body as CreateMediaDTO;

    console.log(this.req.files);
    

    // try {
    //   const result = await this.useCase.execute(dto);

    //   if (result.isLeft()) {
    //     const error = result.value;
  
    //     switch (error.constructor) {
    //       case CreateMediaErrors.ServiceError:
    //         return this.conflict(error.errorValue().message)
    //       default:
    //         return this.fail(error.errorValue().message);
    //     }
    //   } else {
    //     return this.ok(this.res);
    //   }

    // } catch (err) {
    //   return this.fail(err)
    // }

    return this.ok(this.res);
  }
}