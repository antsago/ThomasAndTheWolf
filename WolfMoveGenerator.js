import { Moves, Players } from "./constants";

function WolfMoveGenerator(puzzle) {
  const thomasCell = puzzle[Players.Thomas];
  const wolfCell = puzzle[Players.Wolf];
  if (thomasCell.row < wolfCell.row) {
    return Moves.Up;
  }
  if (thomasCell.row > wolfCell.row) {
    return Moves.Down;
  }
  if (thomasCell.column < wolfCell.column) {
    return Moves.Left;
  }
  return Moves.Right;
}

export default WolfMoveGenerator;
