import { Borders, Moves, Players } from "./constants";

function vertically(thomasPosition, wolfPosition, wolfCell) {
  if (thomasPosition.row < wolfPosition.row) {
    return wolfCell.borders.includes(Borders.Top) ? Moves.Stay : Moves.Up;
  }
  if (thomasPosition.row > wolfPosition.row) {
    return wolfCell.borders.includes(Borders.Bottom) ? Moves.Stay : Moves.Down;
  }

  // In Thomas' cell already
  return Moves.Stay;
}

function horizontally(thomasPosition, wolfPosition, wolfCell) {
  if (thomasPosition.column < wolfPosition.column) {
    return wolfCell.borders.includes(Borders.Left) ? Moves.Stay : Moves.Left;
  }
  if (thomasPosition.column > wolfPosition.column) {
    return wolfCell.borders.includes(Borders.Right) ? Moves.Stay : Moves.Right;
  }

  // In Thomas' cell already
  return Moves.Stay;
}

function diagonally(thomasPosition, wolfPosition, wolfCell) {
  if (thomasPosition.row < wolfPosition.row) {
    return Moves.Up;
  }
  if (thomasPosition.row > wolfPosition.row) {
    return Moves.Down;
  }

  throw new Error("This should never happen");
}

function WolfMoveGenerator(puzzle) {
  const thomasPosition = puzzle[Players.Thomas];
  const wolfPosition = puzzle[Players.Wolf];

  const wolfCell = puzzle.layout[wolfPosition.row][wolfPosition.column];

  if (thomasPosition.column === wolfPosition.column) {
    return vertically(thomasPosition, wolfPosition, wolfCell);
  }
  if (thomasPosition.row === wolfPosition.row) {
    return horizontally(thomasPosition, wolfPosition, wolfCell);
  }
  return diagonally(thomasPosition, wolfPosition, wolfCell);
}

export default WolfMoveGenerator;
