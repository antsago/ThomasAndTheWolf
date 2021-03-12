import PuzzleFactory from "./PuzzleFactory";

function getNewPosition(move, currentPosition) {
  switch (move) {
    case "Thomas-Up":
      return { ...currentPosition, row: currentPosition.row - 1 };
    case "Thomas-Left":
      return { ...currentPosition, column: currentPosition.column - 1 };
    case "Thomas-Right":
      return { ...currentPosition, column: currentPosition.column + 1 };
    default:
      throw new Error("Move not valid");
  }
}

function movePlayer(move, puzzle) {
  const newPosition = getNewPosition(move, puzzle.thomas);

  const updatedPuzzle = PuzzleFactory.fromPuzzle(puzzle)
    .addThomas(newPosition.row, newPosition.column)
    .calculateGameState();

  return updatedPuzzle;
}

export default movePlayer;
