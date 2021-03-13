import request from "supertest";
import { ThomasStates, Turns } from "./game";
import server from "./server";

describe("Server", () => {
  test("Load game", async () => {
    const config = [
      {
        name: "testPuzzle",
        thomas: { row: 2, column: 2 },
        wolf: { row: 1, column: 1 },
        layout: [
          { row: 1, column: 1, borders: "T" },
          { row: 1, column: 2, borders: "TR" },
          { row: 2, column: 1, borders: "LB" },
          { row: 2, column: 2, borders: "BR" },
        ],
      },
    ];

    const game = [
      {
        thomas: config[0].thomas,
        wolf: config[0].wolf,
        turn: Turns.Thomas,
        name: config[0].name,
        thomasState: ThomasStates.Running,
        layout: {
          1: {
            1: { ...config[0].layout[0], isExit: true },
            2: { ...config[0].layout[1], isExit: false },
          },
          2: {
            1: { ...config[0].layout[2], isExit: false },
            2: { ...config[0].layout[3], isExit: false },
          },
        },
      },
    ];

    return request(server)
      .post("/game/load", config)
      .set("Content-type", "application/json")
      .send(config)
      .expect(200, game);
  });
});
