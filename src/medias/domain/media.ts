import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { MediaId } from "./valueObjects/mediaId";
import { MediaType } from "./valueObjects/mediaType";
import { Guard, GuardArgumentCollection } from "../../core/logic/Guard";
import { Entity } from "../../core/domain/Entity";


interface MediaProps {
  type: MediaType;
  link: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  description?: string;
}

export class Media extends Entity<MediaProps>{
  get id (): UniqueEntityID {
    return this._id;
  }

  get mediaId (): MediaId {
    return MediaId.caller(this.id)
  }

  get type (): MediaType {
    return this.props.type;
  }

  get link (): string {
    return this.props.link
  }

  get name (): string {
    return this.props.name;
  }

  get description (): string {
    return this.props.description;
  }

  get createdAt (): string {
    return this.props.createdAt;
  }

  get updatedAt (): string {
    return this.props.updatedAt;
  }


  private constructor (props: MediaProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: MediaProps, id?: UniqueEntityID): Result<Media> {

    const guardedProps: GuardArgumentCollection = [
      { argument: props.type, argumentName: 'type' },
      { argument: props.link, argumentName: 'link' },
      { argument: props.name, argumentName: 'name' },
    ];


    const guardResult = Guard.againstFalsyValuesBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Media>(guardResult.message)
    } 
    
    else {
      const media = new Media({
        ...props,
        description: props.description ? props.description : '',
        name: props.name,
      }, id);

      return Result.ok<Media>(media);
    }
  }
}