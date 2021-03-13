import request from "supertest";
import server from "./server";

describe("Server routes", () => {
  test("Server returns hello world", async () =>
    request(server).get("/").expect("Hello world"));
});
