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

    const result = MovePlayers("Thomas", "Up", initial);

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });

  test("Moving left changes Thomas position", () => {
    const { initial, expected } = testPuzzle(undefined, {
      thomas: { row: 2, column: 1 },
    });

    const result = MovePlayers("Thomas", "Left", initial);

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });

  test("Moving right changes Thomas position", () => {
    const { initial, expected } = testPuzzle(undefined, {
      thomas: { row: 2, column: 3 },
    });

    const result = MovePlayers("Thomas", "Right", initial);

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });

  test("Moving down changes Thomas position", () => {
    const { initial, expected } = testPuzzle(undefined, {
      thomas: { row: 3, column: 2 },
    });

    const result = MovePlayers("Thomas", "Down", initial);

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });

  test("Stay does not change Thomas position", () => {
    const { initial, expected } = testPuzzle();

    const result = MovePlayers("Thomas", "Stay", initial);

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });

  test("Non valid move throws", () => {
    const { initial } = testPuzzle();

    expect(() => MovePlayers("Thomas", "Non-valid-move", initial)).toThrow();
  });
});
