import { Borders, Moves } from "./constants";
import PuzzleFactory from "./PuzzleFactory";

function getNewPosition(move, currentPosition, layout) {
  const cellBorders =
    layout[currentPosition.row][currentPosition.column].borders;
  switch (move) {
    case Moves.Up:
      if (cellBorders.includes(Borders.Top)) {
        throw new Error("Attempting to move through walls!");
      }
      return { ...currentPosition, row: currentPosition.row - 1 };
    case Moves.Down:
      if (cellBorders.includes(Borders.Bottom)) {
        throw new Error("Attempting to move through walls!");
      }
      return { ...currentPosition, row: currentPosition.row + 1 };
    case Moves.Left:
      if (cellBorders.includes(Borders.Left)) {
        throw new Error("Attempting to move through walls!");
      }
      return { ...currentPosition, column: currentPosition.column - 1 };
    case Moves.Right:
      if (cellBorders.includes(Borders.Right)) {
        throw new Error("Attempting to move through walls!");
      }
      return { ...currentPosition, column: currentPosition.column + 1 };
    case Moves.Stay:
      return { ...currentPosition };
    default:
      throw new Error("Move not recognized");
  }
}

function movePlayer(player, move, puzzle) {
  const newPosition = getNewPosition(move, puzzle[player], puzzle.layout);

  return PuzzleFactory.fromPuzzle(puzzle)
    .setPlayer(player, newPosition.row, newPosition.column)
    .calculateGameState();
}

export default movePlayer;
