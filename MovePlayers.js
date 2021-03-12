import { Moves } from "./constants";
import PuzzleFactory from "./PuzzleFactory";

function getNewPosition(move, currentPosition) {
  switch (move) {
    case Moves.Up:
      return { ...currentPosition, row: currentPosition.row - 1 };
    case Moves.Down:
      return { ...currentPosition, row: currentPosition.row + 1 };
    case Moves.Left:
      return { ...currentPosition, column: currentPosition.column - 1 };
    case Moves.Right:
      return { ...currentPosition, column: currentPosition.column + 1 };
    case Moves.Stay:
      return { ...currentPosition };
    default:
      throw new Error("Move not recognized");
  }
}

function movePlayer(player, move, puzzle) {
  const newPosition = getNewPosition(move, puzzle[player]);

  return PuzzleFactory.fromPuzzle(puzzle)
    .setPlayer(player, newPosition.row, newPosition.column)
    .calculateGameState();
}

export default movePlayer;
