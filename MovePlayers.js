import PuzzleFactory from "./PuzzleFactory";

function movePlayer(move, puzzle) {
  const currentPosition = puzzle.thomas;
  const newPosition = { ...currentPosition, row: currentPosition.row - 1 };

  const updatedPuzzle = PuzzleFactory.fromPuzzle(puzzle)
    .addThomas(newPosition.row, newPosition.column)
    .calculateGameState();

  return updatedPuzzle;
}

export default movePlayer;
