function loadPuzzle(puzzle) {
  return {
    name: puzzle.name,
    thomas: puzzle.thomas,
    wolf: puzzle.wolf,
    isThomasTurn: true,
    thomasState: "running",
  };
}

describe("Load puzzle", () => {
  test("Returns basic information", () => {
    const puzzle = {
      name: "puzzle1",
      layout: [],
      wolf: { row: 3, column: 6 },
      thomas: { row: 3, column: 4 },
    };

    const state = loadPuzzle(puzzle);

    expect(state).toEqual({
      thomas: puzzle.thomas,
      wolf: puzzle.wolf,
      isThomasTurn: true,
      name: puzzle.name,
      thomasState: "running",
    });
  });
});
