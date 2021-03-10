function loadPuzzle(puzzle) {
  return {
    name: puzzle.name,
    thomas: puzzle.thomas,
    wolf: puzzle.wolf,
    isThomasTurn: true,
    thomasState: "running",
  };
}

export default loadPuzzle;
