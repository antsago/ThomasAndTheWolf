import { ThomasStates } from "./constants";
import PuzzleFactory from "./PuzzleFactory";

function samplePuzzle(customPuzzle, customExpected) {
  const initial = {
    name: "testPuzzle",
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
    thomas: initial.thomas,
    wolf: initial.wolf,
    isThomasTurn: true,
    name: initial.name,
    thomasState: ThomasStates.Running,
    layout: {
      1: {
        1: { ...initial.layout[0], isExit: true },
        2: { ...initial.layout[1], isExit: false },
      },
      2: {
        1: { ...initial.layout[2], isExit: false },
        2: { ...initial.layout[3], isExit: false },
      },
    },
    ...customExpected,
  };

  return { initial, expected };
}

// These tests should be split into PuzzleFactory and Puzzle builders
// to make them smaller (test only one thing) and easier to understand
describe("Load puzzle", () => {
  test("Handles base puzzle", () => {
    const { initial, expected } = samplePuzzle();

    const result = PuzzleFactory.fromConfig(initial).getPuzzle();

    expect(result).toEqual(expected);
  });

  test("Handles non 1 initial rows and columns", () => {
    const wolf = { row: 3, column: 3 };
    const layout = [
      { row: 3, column: 3, borders: "RB" },
      { row: 3, column: 2, borders: "LB" },
      { row: 2, column: 3, borders: "TR" },
      { row: 2, column: 2, borders: "LT" },
    ];
    const { initial, expected } = samplePuzzle(
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

    const resultingPuzzle = PuzzleFactory.fromConfig(initial).getPuzzle();

    expect(resultingPuzzle).toEqual(expected);
  });

  test("Handles non rectangular grid", () => {
    const layout = [
      { row: 1, column: 1, borders: "TB" },
      { row: 1, column: 2, borders: "TR" },
      { row: 2, column: 2, borders: "LR" },
      { row: 3, column: 1, borders: "BLT" },
      { row: 3, column: 2, borders: "RB" },
    ];
    const { initial, expected } = samplePuzzle(
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

    const resultingPuzzle = PuzzleFactory.fromConfig(initial).getPuzzle();

    expect(resultingPuzzle).toEqual(expected);
  });

  test("Handles non connected cells", () => {
    const layout = [
      { row: 1, column: 1, borders: "" },
      { row: 2, column: 2, borders: "TBLR" },
    ];
    const { initial, expected } = samplePuzzle(
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

    const resultingPuzzle = PuzzleFactory.fromConfig(initial).getPuzzle();

    expect(resultingPuzzle).toEqual(expected);
  });

  test("Throws if characters are in not in a cell", () => {
    const { initial } = samplePuzzle({
      wolf: { row: 99, column: 99 },
      thomas: { row: 99, column: 99 },
    });

    expect(() => PuzzleFactory.fromConfig(initial)).toThrow();
  });

  test("If thomas is in an exit, he's escaped", () => {
    const thomas = { row: 1, column: 1 };
    const { initial, expected } = samplePuzzle(
      {
        thomas,
      },
      {
        thomas,
        thomasState: ThomasStates.Escaped,
      }
    );

    const resultingPuzzle = PuzzleFactory.fromConfig(initial).getPuzzle();

    expect(resultingPuzzle).toEqual(expected);
  });

  test("If wolf is on Thomas, he's eaten", () => {
    const wolf = { row: 2, column: 2 };
    const { initial, expected } = samplePuzzle(
      {
        wolf,
      },
      {
        wolf,
        thomasState: ThomasStates.Eaten,
      }
    );

    const resultingPuzzle = PuzzleFactory.fromConfig(initial).getPuzzle();

    expect(resultingPuzzle).toEqual(expected);
  });

  test("Can load an array of configs", () => {
    const { initial: puzzle1, expected: expected1 } = samplePuzzle();
    const { initial: puzzle2, expected: expected2 } = samplePuzzle();

    const result = PuzzleFactory.fromConfigArray([
      puzzle1,
      puzzle2,
    ]).map((puzzle) => puzzle.getPuzzle());

    expect(result).toEqual([expected1, expected2]);
  });
});
