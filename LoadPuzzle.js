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

function loadPuzzle(puzzle) {
  return {
    name: puzzle.name,
    thomas: puzzle.thomas,
    wolf: puzzle.wolf,
    isThomasTurn: true,
    thomasState: "running",
    layout: puzzle.layout.reduce((rows, rowCell) => {
      if (rowCell.row in rows) {
        return rows;
      }

      return {
        ...rows,
        [rowCell.row]: puzzle.layout
          .filter((cell) => cell.row === rowCell.row)
          .reduce((columns, columnCell) => {
            if (columnCell.column in columnCell) {
              return columns;
            }
            return {
              ...columns,
              [columnCell.column]: columnCell,
            };
          }, {}),
      };
    }, {}),
  };
}

export default loadPuzzle;
