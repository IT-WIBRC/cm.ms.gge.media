import { Mapper } from "../../core/infra/Mapper";
import { Media } from "../domain/media";

export class MediaMap extends Mapper<Media> {
    public static toPersistence (media: Media): any {
        return {
          id: media.id.toString(),
          link: media.link,
          type: media.type.value,
          name: media.name,
          description: media.description,
        }
      }
}