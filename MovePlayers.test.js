import PuzzleFactory from "./PuzzleFactory";
import MovePlayers from "./MovePlayers";

describe("Players moves", () => {
  test("Moving up changes Thomas position", () => {
    const baseConfig = {
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
    const initial = PuzzleFactory.fromConfig(baseConfig);
    const expected = PuzzleFactory.fromConfig({
      ...baseConfig,
      thomas: { row: 1, column: 2 },
    });

    const result = MovePlayers("Thomas-Up", initial);

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });
});
