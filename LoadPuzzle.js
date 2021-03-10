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
    layout: puzzle.layout.reduce((rows, cell) => {
      if (cell.row in rows) {
        return rows;
      }

      return {
        ...rows,
        [cell.row]: createColumnsOfRow(puzzle.layout, cell.row),
      };
    }, {}),
  };
}

export default loadPuzzle;
