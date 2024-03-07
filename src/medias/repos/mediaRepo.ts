import { Media } from "../domain/media";
import { MediaMap } from "../mappers/MediaMap";

export interface IMediaRepo {
  save(media: Media): Promise<void>;
}

export class MediaRepo implements IMediaRepo {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private models: any;

  constructor(models: unknown) {
    this.models = models;
  }

  async save(media: Media): Promise<void> {
    const MediaModel = this.models.Media;
    const rawMedia = MediaMap.toPersistence(media);

    try {
      await MediaModel.save(rawMedia);
    } catch (error) {
      console.log(error);
    }
  }
}
