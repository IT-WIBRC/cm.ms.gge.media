import { Media } from "../domain/media";
import { MediaMap } from "../mappers/MediaMap";

export interface IMediaRepo {
  save(media: Media): Promise<string>;
}

export class MediaRepo implements IMediaRepo {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private models: any;

  constructor(models: unknown) {
    this.models = models;
  }

  async save(media: Media): Promise<string> {
    const MediaModel = this.models.Media;
    const rawMedia = MediaMap.toPersistence(media);

    try {
      const media = await MediaModel.save(rawMedia);
      return media.id;
    } catch (error) {
      console.log(error);
    }
  }
}
