import PuzzleFactory from "./PuzzleFactory";

function movePlayer(move, puzzle) {
  const currentPosition = puzzle.thomas;
  const newPosition =
    move === "Thomas-Up"
      ? { ...currentPosition, row: currentPosition.row - 1 }
      : { ...currentPosition, column: currentPosition.column - 1 };

  const updatedPuzzle = PuzzleFactory.fromPuzzle(puzzle)
    .addThomas(newPosition.row, newPosition.column)
    .calculateGameState();

  return updatedPuzzle;
}

export default movePlayer;
