import request from "supertest";
import { app } from "../../src/infra/http/app";

describe("POST: Create media", () => {
  it("should be successfull", async () => {
    const response = await request(app).post("/api/v1/media")
      .attach("media", "../fixtures/assets/It-wibrc.jpg")
      .field("description", "My file description");

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    console.log(response.body);
  });
});