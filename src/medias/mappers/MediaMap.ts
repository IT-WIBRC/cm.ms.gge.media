import { Mapper } from "../../core/infra/Mapper";
import { Media } from "../domain/media";

type MediaToPersist = {
  id: string;
  link: string;
  type: string;
  description: string;
  name: string;
};

export class MediaMap extends Mapper<Media> {
  public static toPersistence(media: Media): MediaToPersist {
    return {
      id: media.id.toString(),
      link: media.link,
      type: media.type.value,
      name: media.name,
      description: media.description,
    };
  }
}
