import { mediaEntityStub } from "./mocks";
import { MediaMap } from "../mappers/MediaMap";
import { MediaRepo } from "../repos/mediaRepo";

describe("MediaRepo", () => {
  const stubModels = {
    Media: {
      save: jest.fn(() => ({ id: "6a133e20-277f-4f45-bfdf-957ba89f5838" })),
    },
  };

  it("should save the media be successful when the 'save' method is called", async () => {
    const mediaRepo = new MediaRepo(stubModels);
    await mediaRepo.save(mediaEntityStub);
    expect(stubModels.Media.save).toHaveBeenCalledTimes(1);
    expect(stubModels.Media.save).toHaveBeenCalledWith(
      MediaMap.toPersistence(mediaEntityStub),
    );
  });
});
