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
  const newPosition = getNewPosition(
    move,
    player === "Thomas" ? puzzle.thomas : puzzle.wolf
  );

  const updatedPuzzle = PuzzleFactory.fromPuzzle(puzzle);
  if (player === "Thomas") {
    updatedPuzzle.addThomas(newPosition.row, newPosition.column);
  } else {
    updatedPuzzle.addWolf(newPosition.row, newPosition.column);
  }

  updatedPuzzle.calculateGameState();

  return updatedPuzzle;
}

export default movePlayer;
