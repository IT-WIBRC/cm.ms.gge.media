import { MediaType } from "../../valueObjects/mediaType";

describe("MediaType", () => {
    it("should return the media type ValueObject when it is valid", () => {
        const mediaTypeResult = MediaType.create("VIDEO");
        expect(mediaTypeResult.isSuccess).toBe(true);
        expect(mediaTypeResult.isFailure).toBe(false);

        expect(mediaTypeResult.getValue()).toBeInstanceOf(MediaType);
        expect(mediaTypeResult.getValue().value).toBe("VIDEO");
        expect(mediaTypeResult.errorValue()).toBeNull();
    });

    it("should return an error when the type is not provided", () => {
        const mediaTypeResult = MediaType.create("");
        expect(mediaTypeResult.errorValue()).toBe("Media type not provided");
        expect(mediaTypeResult.isSuccess).toBe(false);
        expect(mediaTypeResult.isFailure).toBe(true);
    });

    it("should return an error when the type is unknown", () => {
        const wrongType = "My type";
        const mediaTypeResult = MediaType.create(wrongType);
        expect(mediaTypeResult.errorValue()).toBe(`Unknown the media type '${wrongType}'`);
        expect(mediaTypeResult.isSuccess).toBe(false);
        expect(mediaTypeResult.isFailure).toBe(true);
    });
});