import { Borders, Moves, Players } from "./constants";

function WolfMoveGenerator(puzzle) {
  const thomasPosition = puzzle[Players.Thomas];
  const wolfPosition = puzzle[Players.Wolf];

  const wolfCell = puzzle.layout[wolfPosition.row][wolfPosition.column];

  if (thomasPosition.row < wolfPosition.row) {
    return Moves.Up;
  }
  if (thomasPosition.row > wolfPosition.row) {
    return wolfCell.borders.includes(Borders.Bottom) ? Moves.Stay : Moves.Down;
  }
  if (thomasPosition.column < wolfPosition.column) {
    return Moves.Left;
  }
  return Moves.Right;
}

export default WolfMoveGenerator;
