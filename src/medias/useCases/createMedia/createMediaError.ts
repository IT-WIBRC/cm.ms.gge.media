
import { UseCaseError } from "../../../core/logic/UseCaseError";
import { Result } from "../../../core/logic/Result";

export namespace CreateMediaErrors {
    //to make meaningful
    export class ServiceError extends Result<UseCaseError> {    
        constructor () {
          super(false, {
            message: `Service error`
          } as UseCaseError)
        }
      }
}