import { ValueObject } from "../../../core/domain/ValueObject";
import { Guard } from "../../../core/logic/Guard";
import { Result } from "../../../core/logic/Result";
import { SUPPORTED_MEDIA_TYPE } from "../types";

interface MediaTypeProps {
    value: SUPPORTED_MEDIA_TYPE;
}

export class MediaType extends ValueObject<MediaTypeProps> {
    get value (): SUPPORTED_MEDIA_TYPE {
        return this.props.value;
    }

    private constructor (props: MediaTypeProps) {
        super(props);
    }

    public static create (mediaType: SUPPORTED_MEDIA_TYPE): Result<MediaType> {
        const guardResult = Guard.againstNullOrUndefined(mediaType, 'type');

        if (!guardResult.succeeded) {
          return Result.fail<MediaType>(guardResult.message);
        } else {

          const supportedMediaType = Object.values(SUPPORTED_MEDIA_TYPE).includes(mediaType);
          if (!supportedMediaType) {
            return Result.fail<MediaType>("Media type is unknown");
          }
          
          return Result.ok<MediaType>(new MediaType({ value: mediaType }));
        }
      }
}