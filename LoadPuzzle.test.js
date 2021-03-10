import loadPuzzle from "./LoadPuzzle";

describe("Load puzzle", () => {
  test("Returns basic information", () => {
    const puzzle = {
      name: "puzzle1",
      wolf: { row: 2, column: 2 },
      thomas: { row: 1, column: 1 },
      layout: [
        { row: 1, column: 1, borders: "T" },
        { row: 1, column: 2, borders: "TR" },
        { row: 2, column: 1, borders: "LB" },
        { row: 2, column: 2, borders: "BR" },
      ],
    };

    const state = loadPuzzle(puzzle);

    expect(state).toEqual({
      thomas: puzzle.thomas,
      wolf: puzzle.wolf,
      isThomasTurn: true,
      name: puzzle.name,
      thomasState: "running",
      layout: {
        1: {
          1: puzzle.layout[0],
          2: puzzle.layout[1],
        },
        2: {
          1: puzzle.layout[2],
          2: puzzle.layout[3],
        },
      },
    });
  });
});
