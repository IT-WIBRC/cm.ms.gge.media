import { Media } from "../domain/media";

export interface IMediaRepo {
  save(media: Media): Promise<void>;
}

export class MediaRepo {

}