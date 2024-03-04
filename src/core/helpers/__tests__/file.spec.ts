import { fromBufferToCustomBase64 } from "../file";

const regex = /^(data:[a-z0-9]{3,4};base64,)(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

describe("file", () => {
    describe("fromBufferToBase64", () => {
        it("should return a base64 string", () => {
            expect(
                fromBufferToCustomBase64(Buffer.from("12345", "utf-8"), "jpg")
            ).toMatch(regex);
        });
    });
});