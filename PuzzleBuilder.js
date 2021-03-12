import { Borders, Players, ThomasStates } from "./constants";

class PuzzleBuilder {
  constructor(name) {
    this.name = name;
    this.layout = {};
  }

  setTurn(turn) {
    this.turn = turn;
    return this;
  }

  addCell(row, column, borders) {
    if (!(row in this.layout)) {
      this.layout[row] = {};
    }

    this.layout[row][column] = { row, column, borders };

    return this;
  }

  addCells(cells) {
    cells.forEach((cell) => this.addCell(cell.row, cell.column, cell.borders));
    return this;
  }

  isCellExit(row, column) {
    const cell = this.layout[row][column];
    return (
      (!cell.borders.includes(Borders.Top) &&
        !this.layout[row - 1]?.[column]) ||
      (!cell.borders.includes(Borders.Bottom) &&
        !this.layout[row + 1]?.[column]) ||
      (!cell.borders.includes(Borders.Left) &&
        !this.layout[row]?.[column - 1]) ||
      (!cell.borders.includes(Borders.Right) && !this.layout[row]?.[column + 1])
    );
  }

  calculateExits() {
    Object.keys(this.layout)
      .map((row) => parseInt(row, 10))
      .forEach((row) =>
        Object.keys(this.layout[row])
          .map((column) => parseInt(column, 10))
          .forEach((column) => {
            this.layout[row][column] = {
              ...this.layout[row][column],
              isExit: this.isCellExit(row, column),
            };
          })
      );

    return this;
  }

  setPlayer(player, row, column) {
    if (player !== Players.Thomas && player !== Players.Wolf) {
      throw new Error("Player not recognized");
    }

    if (!this.layout[row]?.[column]) {
      throw new Error("Player must be on the grid");
    }

    this[player] = { row, column };

    return this;
  }

  calculateThomasState() {
    const thomasCell = this[Players.Thomas];
    const wolfCell = this[Players.Wolf];
    const thomasIsOnExit = this.layout[thomasCell.row][thomasCell.column]
      .isExit;
    const wolfIsOnThomas =
      thomasCell.row === wolfCell.row && thomasCell.column === wolfCell.column;

    if (thomasIsOnExit) {
      this.thomasState = ThomasStates.Escaped;
    } else if (wolfIsOnThomas) {
      this.thomasState = ThomasStates.Eaten;
    } else {
      this.thomasState = ThomasStates.Running;
    }

    return this;
  }

  getPuzzle() {
    return {
      name: this.name,
      turn: this.turn,
      thomas: this.Thomas,
      wolf: this.Wolf,
      thomasState: this.thomasState,
      layout: this.layout,
    };
  }
}

export default PuzzleBuilder;
