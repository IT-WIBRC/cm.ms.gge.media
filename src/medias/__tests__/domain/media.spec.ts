import { Media } from "../../domain/media";
import { MediaType } from "../../domain/valueObjects/mediaType";

describe("Media Entity", () => {
  it("should return an error message when the field 'link' is not provided", () => {
    const media = {
      type: MediaType.create("VIDEO").getValue(),
      link: "",
      name: "media-name",
    };
    expect(Media.create(media).errorValue()).toBe(
      "link is not provided or incorrect",
    );
  });

  it("should return an error message when the field 'name' is not provided", () => {
    const media = {
      type: MediaType.create("VIDEO").getValue(),
      link: "ttps://github.com/IT-WIBRC/",
      name: "",
    };
    expect(Media.create(media).errorValue()).toBe(
      "name is not provided or incorrect",
    );
  });

  it("should return the Media instance when all fields are corrects", () => {
    const media = {
      type: MediaType.create("VIDEO").getValue(),
      link: "https://github.com/IT-WIBRC/",
      name: "wibrc-imag-name",
    };
    expect(Media.create(media).getValue()).toBeInstanceOf(Media);
  });
});
