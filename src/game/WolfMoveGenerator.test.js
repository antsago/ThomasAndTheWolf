import { Players, Moves } from "./constants";
import PuzzleFactory from "./PuzzleFactory";
import WolfMoveGenerator from "./WolfMoveGenerator";

function testPuzzle(walls) {
  const baseConfig = {
    name: "testPuzzle",
    thomas: { row: 2, column: 2 },
    wolf: { row: 1, column: 2 },
    layout: [
      { row: 1, column: 1, borders: "TL" },
      { row: 1, column: 2, borders: "T" },
      { row: 1, column: 3, borders: "TR" },
      { row: 2, column: 1, borders: "L" },
      { row: 2, column: 2, borders: "" },
      { row: 2, column: 3, borders: "R" },
      { row: 3, column: 1, borders: "BL" },
      { row: 3, column: 2, borders: "B" },
      { row: 3, column: 3, borders: "BR" },
    ],
  };
  if (walls) {
    baseConfig.layout = [...baseConfig.layout, ...walls];
  }
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

  test("Wolf moves left towards Thomas", () => {
    const puzzle = testPuzzle().setPlayer(Players.Wolf, 2, 3);

    const move = WolfMoveGenerator(puzzle);

    expect(move).toEqual(Moves.Left);
  });

  test("When diagonally Wolf moves up towards Thomas", () => {
    const puzzle = testPuzzle().setPlayer(Players.Wolf, 3, 3);

    const move = WolfMoveGenerator(puzzle);

    expect(move).toEqual(Moves.Up);
  });

  test("When diagonally Wolf moves down towards Thomas", () => {
    const puzzle = testPuzzle().setPlayer(Players.Wolf, 1, 3);

    const move = WolfMoveGenerator(puzzle);

    expect(move).toEqual(Moves.Down);
  });

  test("On the same column and blocked down the Wolf stays", () => {
    const puzzle = testPuzzle([{ row: 1, column: 2, borders: "B" }]).setPlayer(
      Players.Wolf,
      1,
      2
    );

    const move = WolfMoveGenerator(puzzle);

    expect(move).toEqual(Moves.Stay);
  });

  test("On the same column and blocked up the Wolf stays", () => {
    const puzzle = testPuzzle([{ row: 3, column: 2, borders: "T" }]).setPlayer(
      Players.Wolf,
      3,
      2
    );

    const move = WolfMoveGenerator(puzzle);

    expect(move).toEqual(Moves.Stay);
  });

  test("On the same row and blocked right the Wolf stays", () => {
    const puzzle = testPuzzle([{ row: 2, column: 1, borders: "R" }]).setPlayer(
      Players.Wolf,
      2,
      1
    );

    const move = WolfMoveGenerator(puzzle);

    expect(move).toEqual(Moves.Stay);
  });

  test("On the same row and blocked left the Wolf stays", () => {
    const puzzle = testPuzzle([{ row: 2, column: 3, borders: "L" }]).setPlayer(
      Players.Wolf,
      2,
      3
    );

    const move = WolfMoveGenerator(puzzle);

    expect(move).toEqual(Moves.Stay);
  });

  test("When diagonally, blocked down, the Wolf moves left", () => {
    const puzzle = testPuzzle([{ row: 1, column: 3, borders: "B" }]).setPlayer(
      Players.Wolf,
      1,
      3
    );

    const move = WolfMoveGenerator(puzzle);

    expect(move).toEqual(Moves.Left);
  });

  test("When diagonally, blocked down, the Wolf moves right", () => {
    const puzzle = testPuzzle([{ row: 1, column: 1, borders: "B" }]).setPlayer(
      Players.Wolf,
      1,
      1
    );

    const move = WolfMoveGenerator(puzzle);

    expect(move).toEqual(Moves.Right);
  });

  test("When diagonally, blocked up, the Wolf moves left", () => {
    const puzzle = testPuzzle([{ row: 3, column: 3, borders: "T" }]).setPlayer(
      Players.Wolf,
      3,
      3
    );

    const move = WolfMoveGenerator(puzzle);

    expect(move).toEqual(Moves.Left);
  });

  test("When diagonally, blocked up, the Wolf moves right", () => {
    const puzzle = testPuzzle([{ row: 3, column: 1, borders: "T" }]).setPlayer(
      Players.Wolf,
      3,
      1
    );

    const move = WolfMoveGenerator(puzzle);

    expect(move).toEqual(Moves.Right);
  });

  test("When diagonally blocked down-right, the Wolf stays", () => {
    const puzzle = testPuzzle([{ row: 1, column: 1, borders: "BR" }]).setPlayer(
      Players.Wolf,
      1,
      1
    );

    const move = WolfMoveGenerator(puzzle);

    expect(move).toEqual(Moves.Stay);
  });

  test("When diagonally blocked down-left, the Wolf stays", () => {
    const puzzle = testPuzzle([{ row: 1, column: 3, borders: "LB" }]).setPlayer(
      Players.Wolf,
      1,
      3
    );

    const move = WolfMoveGenerator(puzzle);

    expect(move).toEqual(Moves.Stay);
  });

  test("When diagonally blocked up-left, the Wolf stays", () => {
    const puzzle = testPuzzle([{ row: 3, column: 3, borders: "TL" }]).setPlayer(
      Players.Wolf,
      3,
      3
    );

    const move = WolfMoveGenerator(puzzle);

    expect(move).toEqual(Moves.Stay);
  });

  test("When diagonally blocked up-right, the Wolf stays", () => {
    const puzzle = testPuzzle([{ row: 3, column: 1, borders: "TR" }]).setPlayer(
      Players.Wolf,
      3,
      1
    );

    const move = WolfMoveGenerator(puzzle);

    expect(move).toEqual(Moves.Stay);
  });
});
