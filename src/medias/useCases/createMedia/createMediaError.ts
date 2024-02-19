
import { UseCaseError } from "../../../core/logic/UseCaseError";
import { Result } from "../../../core/logic/Result";

export namespace CreateMediaErrors {
    export class NoMediaUploaded extends Result<UseCaseError> {    
        constructor () {
          super(false, {
            message: `No media uploaded`
          } as UseCaseError)
        }
      }
}