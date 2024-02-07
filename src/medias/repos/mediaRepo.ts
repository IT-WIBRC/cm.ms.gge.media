import { Media } from "../domain/media";
import { MediaId } from "../domain/valueObjects/mediaId";

export interface IMediaRepo { 
  exists (mediaId: MediaId): Promise<boolean>;
  save(media: Media): Promise<void>;
}

export class MediaRepo {

}