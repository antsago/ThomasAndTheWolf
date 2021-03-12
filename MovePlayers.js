import PuzzleFactory from "./PuzzleFactory";

function getNewPosition(move, currentPosition) {
  switch (move) {
    case "Up":
      return { ...currentPosition, row: currentPosition.row - 1 };
    case "Down":
      return { ...currentPosition, row: currentPosition.row + 1 };
    case "Left":
      return { ...currentPosition, column: currentPosition.column - 1 };
    case "Right":
      return { ...currentPosition, column: currentPosition.column + 1 };
    case "Stay":
      return { ...currentPosition };
    default:
      throw new Error("Move not valid");
  }
}

function movePlayer(player, move, puzzle) {
  const newPosition = getNewPosition(move, puzzle[player]);

  return PuzzleFactory.fromPuzzle(puzzle)
    .setPlayer(player, newPosition.row, newPosition.column)
    .calculateGameState();
}

export default movePlayer;
