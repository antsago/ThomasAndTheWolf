import { Borders, Moves, Players, Turns } from "./constants";
import PuzzleFactory from "./PuzzleFactory";

class MoveBuilder {
  constructor(initialState, move, player) {
    this.outcome = PuzzleFactory.fromPuzzle(initialState);
    this.move = move;
    this.player = player;
  }

  calculatePosition() {
    const playerPosition = this.outcome[this.player];
    const currentCell = this.outcome.layout[playerPosition.row][
      playerPosition.column
    ];

    switch (this.move) {
      case Moves.Up:
        if (currentCell.borders.includes(Borders.Top)) {
          throw new Error("Attempting to move through walls!");
        }
        this.outcome.setPlayer(
          this.player,
          currentCell.row - 1,
          currentCell.column
        );
        break;
      case Moves.Down:
        if (currentCell.borders.includes(Borders.Bottom)) {
          throw new Error("Attempting to move through walls!");
        }
        this.outcome.setPlayer(
          this.player,
          currentCell.row + 1,
          currentCell.column
        );
        break;
      case Moves.Left:
        if (currentCell.borders.includes(Borders.Left)) {
          throw new Error("Attempting to move through walls!");
        }
        this.outcome.setPlayer(
          this.player,
          currentCell.row,
          currentCell.column - 1
        );
        break;
      case Moves.Right:
        if (currentCell.borders.includes(Borders.Right)) {
          throw new Error("Attempting to move through walls!");
        }
        this.outcome.setPlayer(
          this.player,
          currentCell.row,
          currentCell.column + 1
        );
        break;
      case Moves.Stay:
        this.outcome.setPlayer(
          this.player,
          currentCell.row,
          currentCell.column
        );
        break;
      default:
        throw new Error("Move not recognized");
    }
    return this;
  }

  calculateTurn() {
    if (
      (this.player === Players.Wolf && this.outcome.turn === Turns.Thomas) ||
      (this.player === Players.Thomas && this.outcome.turn !== Turns.Thomas)
    ) {
      throw new Error("Moving out of turn");
    }

    switch (this.outcome.turn) {
      case Turns.Thomas:
        this.outcome.setTurn(Turns.Wolf1);
        break;
      case Turns.Wolf1:
        this.outcome.setTurn(Turns.Wolf2);
        break;
      case Turns.Wolf2:
        this.outcome.setTurn(Turns.Thomas);
        break;
      default:
        throw new Error("Turn not recognized");
    }

    return this;
  }

  calculateThomasState() {
    this.outcome.calculateThomasState();
    return this;
  }

  static move(player, move, puzzle) {
    return new MoveBuilder(puzzle, move, player)
      .calculatePosition()
      .calculateTurn()
      .calculateThomasState().outcome;
  }
}

export default MoveBuilder;
