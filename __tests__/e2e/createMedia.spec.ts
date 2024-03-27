import request from "supertest";
import { app } from "../../src/infra/http/app";
import { getFile } from "../utils";



describe("POST: Create media", () => {
  it("should be successfull", async () => {

    const buffer = getFile("/fixtures/assets/It-wibrc.jpg");

    const response = await request(app)
      .post("/api/v1/media/add")
      .field("description", "My file description")
      .attach("media", buffer, "It-wibrc.jpg");      

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  });
});