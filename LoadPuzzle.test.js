import loadPuzzle from "./LoadPuzzle";

function samplePuzzle(customPuzzle, customExpected) {
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
    ...customPuzzle,
  };

  const expected = {
    thomas: puzzle.thomas,
    wolf: puzzle.wolf,
    isThomasTurn: true,
    name: puzzle.name,
    thomasState: "running",
    layout: {
      1: {
        1: { ...puzzle.layout[0], isExit: true },
        2: { ...puzzle.layout[1], isExit: false },
      },
      2: {
        1: { ...puzzle.layout[2], isExit: false },
        2: { ...puzzle.layout[3], isExit: false },
      },
    },
    ...customExpected,
  };

  return { puzzle, expected };
}

describe("Load puzzle", () => {
  test("Returns basic information", () => {
    const { puzzle, expected } = samplePuzzle();

    const state = loadPuzzle(puzzle);

    expect(state).toEqual(expected);
  });

  test("Handles non 1 initial rows and columns", () => {
    const thomas = { row: 3, column: 3 };
    const layout = [
      { row: 3, column: 3, borders: "" },
      { row: 3, column: 2, borders: "" },
      { row: 2, column: 3, borders: "" },
      { row: 2, column: 2, borders: "" },
    ];
    const { puzzle, expected } = samplePuzzle(
      {
        layout,
        thomas,
      },
      {
        layout: {
          3: {
            3: { ...layout[0], isExit: true },
            2: { ...layout[1], isExit: true },
          },
          2: {
            3: { ...layout[2], isExit: true },
            2: { ...layout[3], isExit: true },
          },
        },
        thomas,
      }
    );

    const state = loadPuzzle(puzzle);

    expect(state).toEqual(expected);
  });

  test("Handles non rectangular grid", () => {
    const layout = [
      { row: 1, column: 1, borders: "TB" },
      { row: 1, column: 2, borders: "TR" },
      { row: 2, column: 2, borders: "LR" },
      { row: 3, column: 1, borders: "BLT" },
      { row: 3, column: 2, borders: "RB" },
    ];
    const { puzzle, expected } = samplePuzzle(
      {
        layout,
      },
      {
        layout: {
          1: {
            1: { ...layout[0], isExit: true },
            2: { ...layout[1], isExit: false },
          },
          2: {
            2: { ...layout[2], isExit: false },
          },
          3: {
            1: { ...layout[3], isExit: false },
            2: { ...layout[4], isExit: false },
          },
        },
      }
    );

    const state = loadPuzzle(puzzle);

    expect(state).toEqual(expected);
  });

  test("Handles non connected cells", () => {
    const layout = [
      { row: 1, column: 1, borders: "" },
      { row: 2, column: 2, borders: "" },
    ];
    const { puzzle, expected } = samplePuzzle(
      {
        layout,
      },
      {
        layout: {
          1: {
            1: { ...layout[0], isExit: true },
          },
          2: {
            2: { ...layout[1], isExit: true },
          },
        },
      }
    );

    const state = loadPuzzle(puzzle);

    expect(state).toEqual(expected);
  });

  test("Throws if characters are in not in a cell", () => {
    const { puzzle } = samplePuzzle({
      wolf: { row: 99, column: 99 },
      thomas: { row: 99, column: 99 },
    });

    expect(() => loadPuzzle(puzzle)).toThrow();
  });
});
