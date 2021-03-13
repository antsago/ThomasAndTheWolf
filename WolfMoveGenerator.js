import { Moves, Players } from "./constants";

function WolfMoveGenerator(puzzle) {
  const thomasCell = puzzle[Players.Thomas];
  const wolfCell = puzzle[Players.Wolf];
  if (thomasCell.row < wolfCell.row) {
    return Moves.Up;
  }
  return Moves.Down;
}

export default WolfMoveGenerator;
