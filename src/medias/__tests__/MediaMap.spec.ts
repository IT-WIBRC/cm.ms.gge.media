import { MediaMap } from "../mappers/MediaMap";
import { mediaEntityStub } from "./mocks";

describe("MediaMap", () => {
    it("should return the the persistence from the entity", () => {
        const persistence = MediaMap.toPersistence(mediaEntityStub);
        expect(persistence.id).toMatch(new RegExp(/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/));
        expect(persistence.type).toBe("IMAGE");
        expect(persistence.link).toBe("https://cloudinary");
        expect(persistence.name).toBe("wibrc-image");
        expect(persistence.description).toBe("Here is the description");
    });
});