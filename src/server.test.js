import request from "supertest";
import { MoveBuilder, Moves, Players, PuzzleFactory } from "./game";
import server from "./server";

describe("Server", () => {
  test("Load game", async () => {
    const config = {
      name: "testPuzzle",
      thomas: { row: 2, column: 2 },
      wolf: { row: 1, column: 1 },
      layout: [
        { row: 1, column: 1, borders: "T" },
        { row: 1, column: 2, borders: "TR" },
        { row: 2, column: 1, borders: "LB" },
        { row: 2, column: 2, borders: "BR" },
      ],
    };

    const game = PuzzleFactory.fromConfig(config).getPuzzle();

    return request(server)
      .post("/game/load")
      .set("Content-type", "application/json")
      .send([config])
      .expect(200, [game]);
  });

  test("Make move", async () => {
    const puzzle = PuzzleFactory.fromConfig({
      name: "testPuzzle",
      thomas: { row: 2, column: 2 },
      wolf: { row: 1, column: 1 },
      layout: [
        { row: 1, column: 1, borders: "T" },
        { row: 1, column: 2, borders: "TR" },
        { row: 2, column: 1, borders: "LB" },
        { row: 2, column: 2, borders: "BR" },
      ],
    }).getPuzzle();
    const player = Players.Thomas;
    const move = Moves.Up;
    const finalState = MoveBuilder.move(player, move, puzzle).getPuzzle();

    return request(server)
      .post("/game/move")
      .set("Content-type", "application/json")
      .send({
        move,
        player,
        puzzle,
      })
      .expect(200, finalState);
  });
});
