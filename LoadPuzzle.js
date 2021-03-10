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

function createLayout(layout) {
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
