import loadPuzzle from "./LoadPuzzle";

function samplePuzzle(customPuzzle, customExpected) {
  const puzzle = {
    name: "puzzle1",
    thomas: { row: 2, column: 2 },
    wolf: { row: 1, column: 1 },
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
  test("Handles base puzzle", () => {
    const { puzzle, expected } = samplePuzzle();

    const state = loadPuzzle(puzzle);

    expect(state).toEqual(expected);
  });

  test("Handles non 1 initial rows and columns", () => {
    const wolf = { row: 3, column: 3 };
    const layout = [
      { row: 3, column: 3, borders: "RB" },
      { row: 3, column: 2, borders: "LB" },
      { row: 2, column: 3, borders: "TR" },
      { row: 2, column: 2, borders: "LT" },
    ];
    const { puzzle, expected } = samplePuzzle(
      {
        layout,
        wolf,
      },
      {
        layout: {
          3: {
            3: { ...layout[0], isExit: false },
            2: { ...layout[1], isExit: false },
          },
          2: {
            3: { ...layout[2], isExit: false },
            2: { ...layout[3], isExit: false },
          },
        },
        wolf,
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
      { row: 2, column: 2, borders: "TBLR" },
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
            2: { ...layout[1], isExit: false },
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

  test("If thomas is in an exit, he's escaped", () => {
    const thomas = { row: 1, column: 1 };
    const { puzzle, expected } = samplePuzzle(
      {
        thomas,
      },
      {
        thomas,
        thomasState: "escaped",
      }
    );

    const state = loadPuzzle(puzzle);

    expect(state).toEqual(expected);
  });

  test("If wolf is on Thomas, he's eaten", () => {
    const wolf = { row: 2, column: 2 };
    const { puzzle, expected } = samplePuzzle(
      {
        wolf,
      },
      {
        wolf,
        thomasState: "eaten",
      }
    );

    const state = loadPuzzle(puzzle);

    expect(state).toEqual(expected);
  });
});
