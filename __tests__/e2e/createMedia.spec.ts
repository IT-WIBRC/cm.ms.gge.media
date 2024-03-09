import request from "supertest";
import { app } from "../../src/infra/http/app";

describe("POST: Create media", () => {
  it("should be successfull", async () => {
    const response = await request(app).post("/api/v1/media");

    expect(response.body);
    console.log(response.body);
  });
});