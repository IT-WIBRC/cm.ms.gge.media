import { Media } from "../domain/media";

export interface IMediaRepo {
  save(media: Media): Promise<void>;
}

export class MediaRepo implements IMediaRepo {
  private models: any;

  constructor (models: any) {
    this.models = models;
  }

  save(media: Media): Promise<void> {
    throw new Error("Method not implemented.");
  }
}