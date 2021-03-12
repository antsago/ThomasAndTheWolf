import { Players, Moves } from "./constants";
import PuzzleFactory from "./PuzzleFactory";
import MovePlayers from "./MovePlayers";

function testPuzzle(initialConfig, expectedConfig) {
  const baseConfig = {
    name: "testPuzzle",
    thomas: { row: 2, column: 2 },
    wolf: { row: 1, column: 1 },
    layout: [
      { row: 1, column: 1, borders: "T" },
      { row: 1, column: 2, borders: "TR" },
      { row: 2, column: 1, borders: "LB" },
      { row: 2, column: 2, borders: "" },
      { row: 2, column: 3, borders: "RBT" },
      { row: 3, column: 2, borders: "BRL" },
    ],
    ...initialConfig,
  };
  const initial = PuzzleFactory.fromConfig(baseConfig);
  const expected = PuzzleFactory.fromConfig({
    ...baseConfig,
    ...expectedConfig,
  });

  return { initial, expected };
}

describe("Players moves", () => {
  test("Moving up changes Thomas position", () => {
    const { initial, expected } = testPuzzle(undefined, {
      thomas: { row: 1, column: 2 },
    });

    const result = MovePlayers(Players.Thomas, Moves.Up, initial);

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });

  test("Moving left changes Thomas position", () => {
    const { initial, expected } = testPuzzle(undefined, {
      thomas: { row: 2, column: 1 },
    });

    const result = MovePlayers(Players.Thomas, Moves.Left, initial);

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });

  test("Moving right changes Thomas position", () => {
    const { initial, expected } = testPuzzle(undefined, {
      thomas: { row: 2, column: 3 },
    });

    const result = MovePlayers(Players.Thomas, Moves.Right, initial);

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });

  test("Moving down changes Thomas position", () => {
    const { initial, expected } = testPuzzle(undefined, {
      thomas: { row: 3, column: 2 },
    });

    const result = MovePlayers(Players.Thomas, Moves.Down, initial);

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });

  test("Stay does not change Thomas position", () => {
    const { initial, expected } = testPuzzle();

    const result = MovePlayers(Players.Thomas, Moves.Stay, initial);

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });

  test("Moving up changes Wolf position", () => {
    const { initial, expected } = testPuzzle(
      {
        thomas: { row: 1, column: 1 },
        wolf: { row: 2, column: 2 },
      },
      {
        thomas: { row: 1, column: 1 },
        wolf: { row: 1, column: 2 },
      }
    );

    const result = MovePlayers(Players.Wolf, Moves.Up, initial);

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });

  test("Moving left changes Wolf position", () => {
    const { initial, expected } = testPuzzle(
      {
        thomas: { row: 1, column: 1 },
        wolf: { row: 2, column: 2 },
      },
      {
        thomas: { row: 1, column: 1 },
        wolf: { row: 2, column: 1 },
      }
    );

    const result = MovePlayers(Players.Wolf, Moves.Left, initial);

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });

  test("Moving right changes Wolf position", () => {
    const { initial, expected } = testPuzzle(
      {
        thomas: { row: 1, column: 1 },
        wolf: { row: 2, column: 2 },
      },
      {
        thomas: { row: 1, column: 1 },
        wolf: { row: 2, column: 3 },
      }
    );

    const result = MovePlayers(Players.Wolf, Moves.Right, initial);

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });

  test("Moving down changes Wolf position", () => {
    const { initial, expected } = testPuzzle(
      {
        thomas: { row: 1, column: 1 },
        wolf: { row: 2, column: 2 },
      },
      {
        thomas: { row: 1, column: 1 },
        wolf: { row: 3, column: 2 },
      }
    );

    const result = MovePlayers(Players.Wolf, Moves.Down, initial);

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });

  test("Stay does not change Wolf position", () => {
    const { initial, expected } = testPuzzle();

    const result = MovePlayers(Players.Wolf, Moves.Stay, initial);

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });

  test("Non valid move throws", () => {
    const { initial } = testPuzzle();

    expect(() =>
      MovePlayers(Players.Thomas, "Non-valid-move", initial)
    ).toThrow();
  });

  test("Non valid player throws", () => {
    const { initial } = testPuzzle();

    expect(() => MovePlayers("A-phantom", Moves.Left, initial)).toThrow();
  });

  test("Moving up through a wall throws", () => {
    const { initial } = testPuzzle({
      layout: [
        { row: 1, column: 1, borders: "T" },
        { row: 2, column: 2, borders: "TLBR" },
      ],
    });

    expect(() => MovePlayers(Players.Thomas, Moves.Up, initial)).toThrow();
  });

  test("Moving left through a wall throws", () => {
    const { initial } = testPuzzle({
      layout: [
        { row: 1, column: 1, borders: "T" },
        { row: 2, column: 2, borders: "TLBR" },
      ],
    });

    expect(() => MovePlayers(Players.Thomas, Moves.Left, initial)).toThrow();
  });

  test("Moving right through a wall throws", () => {
    const { initial } = testPuzzle({
      layout: [
        { row: 1, column: 1, borders: "T" },
        { row: 2, column: 2, borders: "TLBR" },
      ],
    });

    expect(() => MovePlayers(Players.Thomas, Moves.Right, initial)).toThrow();
  });

  test("Moving down through a wall throws", () => {
    const { initial } = testPuzzle({
      layout: [
        { row: 1, column: 1, borders: "T" },
        { row: 2, column: 2, borders: "TLBR" },
      ],
    });

    expect(() => MovePlayers(Players.Thomas, Moves.Down, initial)).toThrow();
  });

  test("Moving into space throws", () => {
    const { initial } = testPuzzle({
      layout: [
        { row: 1, column: 1, borders: "T" },
        { row: 2, column: 2, borders: "" },
      ],
    });

    expect(() => MovePlayers(Players.Thomas, Moves.Up, initial)).toThrow();
  });
});
