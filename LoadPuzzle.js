import PuzzleBuilder from "./PuzzleBuilder";

function loadPuzzle(puzzle) {
  // Run input through some schema validator like yup or joi

  return new PuzzleBuilder(puzzle.name, true)
    .addCells(puzzle.layout)
    .calculateExits()
    .addThomas(puzzle.thomas.row, puzzle.thomas.column)
    .addWolf(puzzle.wolf.row, puzzle.wolf.column)
    .calculateGameState()
    .getPuzzle();
}

export default loadPuzzle;
