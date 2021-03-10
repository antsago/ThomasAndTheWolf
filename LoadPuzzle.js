function createColumnsOfRow(layout, rowNumber) {
  return layout
    .filter((cell) => cell.row === rowNumber)
    .reduce((columns, cell) => {
      if (cell.column in columns) {
        return columns;
      }

      return {
        ...columns,
        [cell.column]: cell,
      };
    }, {});
}

function createCells(layout) {
  return layout.reduce((rows, cell) => {
    if (cell.row in rows) {
      return rows;
    }

    return {
      ...rows,
      [cell.row]: createColumnsOfRow(layout, cell.row),
    };
  }, {});
}

function findExits(cells) {
  const cellsWithExit = {};

  Object.keys(cells)
    .map((row) => parseInt(row, 10))
    .forEach((row) =>
      Object.keys(cells[row])
        .map((column) => parseInt(column, 10))
        .forEach((column) => {
          const cell = cells[row][column];
          const isExit =
            (!cell.borders.includes("T") && !cells[row - 1]?.[column]) ||
            (!cell.borders.includes("B") && !cells[row + 1]?.[column]) ||
            (!cell.borders.includes("L") && !cells[row]?.[column - 1]) ||
            (!cell.borders.includes("R") && !cells[row]?.[column + 1]);

          if (!(row in cellsWithExit)) {
            cellsWithExit[row] = {};
          }
          cellsWithExit[row][column] = { ...cell, isExit };
        })
    );

  return cellsWithExit;
}

function createLayout(layout) {
  const cells = createCells(layout);
  return findExits(cells);
}

function loadPuzzle(puzzle) {
  // Run input through some schema validator like yup or joi

  const { thomas, wolf } = puzzle;
  const layout = createLayout(puzzle.layout);

  const thomasIsInGrid = !!layout[thomas.row]?.[thomas.column];
  const wolfIsInGrid = !!layout[wolf.row]?.[wolf.column];

  if (!thomasIsInGrid || !wolfIsInGrid) {
    throw new Error("Thomas and the wolf must be in the grid");
  }

  return {
    name: puzzle.name,
    thomas,
    wolf,
    isThomasTurn: true,
    thomasState: "running",
    layout,
  };
}

export default loadPuzzle;
