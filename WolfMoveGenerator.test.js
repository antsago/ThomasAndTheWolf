import { Players, Moves } from "./constants";
import PuzzleFactory from "./PuzzleFactory";
import WolfMoveGenerator from "./WolfMoveGenerator";

function testPuzzle(initialConfig) {
  const baseConfig = {
    name: "testPuzzle",
    thomas: { row: 2, column: 2 },
    wolf: { row: 1, column: 2 },
    layout: [
      { row: 1, column: 2, borders: "TLR" },
      { row: 2, column: 1, borders: "TBR" },
      { row: 2, column: 2, borders: "" },
      { row: 2, column: 3, borders: "TBL" },
      { row: 3, column: 2, borders: "RBL" },
    ],
    ...initialConfig,
  };
  return PuzzleFactory.fromConfig(baseConfig);
}

describe("Wolf move generator", () => {
  test("Wolf moves up towards Thomas", () => {
    const puzzle = testPuzzle().setPlayer(Players.Wolf, 3, 2);

    const move = WolfMoveGenerator(puzzle);

    expect(move).toEqual(Moves.Up);
  });

  test("Wolf moves down towards Thomas", () => {
    const puzzle = testPuzzle().setPlayer(Players.Wolf, 1, 2);

    const move = WolfMoveGenerator(puzzle);

    expect(move).toEqual(Moves.Down);
  });

  test("Wolf moves right towards Thomas", () => {
    const puzzle = testPuzzle().setPlayer(Players.Wolf, 2, 1);

    const move = WolfMoveGenerator(puzzle);

    expect(move).toEqual(Moves.Right);
  });
});
