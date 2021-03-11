import PuzzleBuilder from "./PuzzleBuilder";

function movePlayer(move, puzzle) {
  const currentPosition = puzzle.thomas;
  const newPosition = { ...currentPosition, row: currentPosition.row - 1 };

  const updatedPuzzle = new PuzzleBuilder(puzzle.name, puzzle.isThomasTurn);
  updatedPuzzle.layout = puzzle.layout;
  updatedPuzzle
    .addThomas(newPosition.row, newPosition.column)
    .addWolf(puzzle.wolf.row, puzzle.wolf.column)
    .calculateGameState();

  return updatedPuzzle;
}

export default movePlayer;
