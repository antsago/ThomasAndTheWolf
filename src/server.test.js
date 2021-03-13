import request from "supertest";
import {
  MoveBuilder,
  Moves,
  Players,
  PuzzleFactory,
  Turns,
  WolfMoveGenerator,
} from "./game";
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
      .send({ puzzles: [config] })
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

  test("Get wolf move", async () => {
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
    }).setTurn(Turns.Wolf1);
    const move = WolfMoveGenerator(puzzle);

    return request(server)
      .post("/game/moveWolf")
      .set("Content-type", "application/json")
      .send(puzzle.getPuzzle())
      .expect(200, { move });
  });

  test("Handles errors gracefully", async () =>
    request(server)
      .post("/game/load")
      .set("Content-type", "application/json")
      .send([{ foo: "bar" }])
      .expect(500));
});
