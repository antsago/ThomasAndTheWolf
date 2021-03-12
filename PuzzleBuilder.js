class PuzzleBuilder {
  constructor(name, isThomasTurn) {
    this.name = name;
    this.isThomasTurn = isThomasTurn;
    this.layout = {};
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
      (!cell.borders.includes("T") && !this.layout[row - 1]?.[column]) ||
      (!cell.borders.includes("B") && !this.layout[row + 1]?.[column]) ||
      (!cell.borders.includes("L") && !this.layout[row]?.[column - 1]) ||
      (!cell.borders.includes("R") && !this.layout[row]?.[column + 1])
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
    if (player !== "Thomas" && player !== "Wolf") {
      throw new Error("Player not recognized");
    }

    if (!this.layout[row]?.[column]) {
      throw new Error("Player must be on the grid");
    }

    this[player] = { row, column };

    return this;
  }

  calculateGameState() {
    const thomasIsOnExit = this.layout[this.Thomas.row][this.Thomas.column]
      .isExit;
    const wolfIsOnThomas =
      this.Thomas.row === this.Wolf.row &&
      this.Thomas.column === this.Wolf.column;

    if (thomasIsOnExit) {
      this.thomasState = "escaped";
    } else if (wolfIsOnThomas) {
      this.thomasState = "eaten";
    } else {
      this.thomasState = "running";
    }

    return this;
  }

  getPuzzle() {
    return {
      name: this.name,
      isThomasTurn: this.isThomasTurn,
      thomas: this.Thomas,
      wolf: this.Wolf,
      thomasState: this.thomasState,
      layout: this.layout,
    };
  }
}

export default PuzzleBuilder;
