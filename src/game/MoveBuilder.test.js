import { Players, Moves, Turns } from "./constants";
import PuzzleFactory from "./PuzzleFactory";
import MoveBuilder from "./MoveBuilder";

function testPuzzle(initialConfig, expectedConfig) {
  const baseConfig = {
    name: "testPuzzle",
    thomas: { row: 2, column: 2 },
    wolf: { row: 1, column: 1 },
    layout: [
      { row: 1, column: 1, borders: "TL" },
      { row: 1, column: 2, borders: "TR" },
      { row: 2, column: 1, borders: "LB" },
      { row: 2, column: 2, borders: "" },
      { row: 2, column: 3, borders: "RBT" },
      { row: 3, column: 2, borders: "BRL" },
    ],
    ...initialConfig,
  };
  const initial = PuzzleFactory.fromConfig(baseConfig);
  const expected = PuzzleFactory.fromConfig({
    ...baseConfig,
    ...expectedConfig,
  }).setTurn(Turns.Wolf1);

  return { initial, expected };
}

describe("Players moves", () => {
  test("Moving up changes Thomas position", () => {
    const { initial, expected } = testPuzzle();
    expected.setPlayer(Players.Thomas, 1, 2);

    const result = MoveBuilder.move(
      Players.Thomas,
      Moves.Up,
      initial.getPuzzle()
    );

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });

  test("Moving left changes Thomas position", () => {
    const { initial, expected } = testPuzzle();
    expected.setPlayer(Players.Thomas, 2, 1);

    const result = MoveBuilder.move(
      Players.Thomas,
      Moves.Left,
      initial.getPuzzle()
    );

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });

  test("Moving right changes Thomas position", () => {
    const { initial, expected } = testPuzzle();
    expected.setPlayer(Players.Thomas, 2, 3);

    const result = MoveBuilder.move(
      Players.Thomas,
      Moves.Right,
      initial.getPuzzle()
    );

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });

  test("Moving down changes Thomas position", () => {
    const { initial, expected } = testPuzzle();
    expected.setPlayer(Players.Thomas, 3, 2);

    const result = MoveBuilder.move(
      Players.Thomas,
      Moves.Down,
      initial.getPuzzle()
    );

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });

  test("Stay does not change Thomas position", () => {
    const { initial, expected } = testPuzzle();

    const result = MoveBuilder.move(
      Players.Thomas,
      Moves.Stay,
      initial.getPuzzle()
    );

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });

  test("Moving up changes Wolf position", () => {
    const { initial, expected } = testPuzzle();
    initial
      .setPlayer(Players.Thomas, 1, 1)
      .setPlayer(Players.Wolf, 2, 2)
      .setTurn(Turns.Wolf1);
    expected
      .setPlayer(Players.Thomas, 1, 1)
      .setPlayer(Players.Wolf, 1, 2)
      .setTurn(Turns.Wolf2);

    const result = MoveBuilder.move(
      Players.Wolf,
      Moves.Up,
      initial.getPuzzle()
    );

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });

  test("Moving left changes Wolf position", () => {
    const { initial, expected } = testPuzzle();
    initial
      .setPlayer(Players.Thomas, 1, 1)
      .setPlayer(Players.Wolf, 2, 2)
      .setTurn(Turns.Wolf1);
    expected
      .setPlayer(Players.Thomas, 1, 1)
      .setPlayer(Players.Wolf, 2, 1)
      .setTurn(Turns.Wolf2);

    const result = MoveBuilder.move(
      Players.Wolf,
      Moves.Left,
      initial.getPuzzle()
    );

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });

  test("Moving right changes Wolf position", () => {
    const { initial, expected } = testPuzzle();
    initial
      .setPlayer(Players.Thomas, 1, 1)
      .setPlayer(Players.Wolf, 2, 2)
      .setTurn(Turns.Wolf1);
    expected
      .setPlayer(Players.Thomas, 1, 1)
      .setPlayer(Players.Wolf, 2, 3)
      .setTurn(Turns.Wolf2);

    const result = MoveBuilder.move(
      Players.Wolf,
      Moves.Right,
      initial.getPuzzle()
    );

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });

  test("Moving down changes Wolf position", () => {
    const { initial, expected } = testPuzzle();
    initial
      .setPlayer(Players.Thomas, 1, 1)
      .setPlayer(Players.Wolf, 2, 2)
      .setTurn(Turns.Wolf1);
    expected
      .setPlayer(Players.Thomas, 1, 1)
      .setPlayer(Players.Wolf, 3, 2)
      .setTurn(Turns.Wolf2);

    const result = MoveBuilder.move(
      Players.Wolf,
      Moves.Down,
      initial.getPuzzle()
    );

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });

  test("Stay does not change Wolf position", () => {
    const { initial, expected } = testPuzzle();
    initial.setTurn(Turns.Wolf1);
    expected.setTurn(Turns.Wolf2);

    const result = MoveBuilder.move(
      Players.Wolf,
      Moves.Stay,
      initial.getPuzzle()
    );

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });

  test("Non valid move throws", () => {
    const { initial } = testPuzzle();

    expect(() =>
      MoveBuilder.move(Players.Thomas, "Non-valid-move", initial.getPuzzle())
    ).toThrow();
  });

  test("Non valid player throws", () => {
    const { initial } = testPuzzle();

    expect(() =>
      MoveBuilder.move("A-phantom", Moves.Left, initial.getPuzzle())
    ).toThrow();
  });

  test("Moving up through a wall throws", () => {
    const { initial } = testPuzzle({
      layout: [
        { row: 1, column: 1, borders: "T" },
        { row: 2, column: 2, borders: "TLBR" },
      ],
    });

    expect(() =>
      MoveBuilder.move(Players.Thomas, Moves.Up, initial.getPuzzle())
    ).toThrow();
  });

  test("Moving left through a wall throws", () => {
    const { initial } = testPuzzle({
      layout: [
        { row: 1, column: 1, borders: "T" },
        { row: 2, column: 2, borders: "TLBR" },
      ],
    });

    expect(() =>
      MoveBuilder.move(Players.Thomas, Moves.Left, initial.getPuzzle())
    ).toThrow();
  });

  test("Moving right through a wall throws", () => {
    const { initial } = testPuzzle({
      layout: [
        { row: 1, column: 1, borders: "T" },
        { row: 2, column: 2, borders: "TLBR" },
      ],
    });

    expect(() =>
      MoveBuilder.move(Players.Thomas, Moves.Right, initial.getPuzzle())
    ).toThrow();
  });

  test("Moving down through a wall throws", () => {
    const { initial } = testPuzzle({
      layout: [
        { row: 1, column: 1, borders: "T" },
        { row: 2, column: 2, borders: "TLBR" },
      ],
    });

    expect(() =>
      MoveBuilder.move(Players.Thomas, Moves.Down, initial.getPuzzle())
    ).toThrow();
  });

  test("Moving into space throws", () => {
    const { initial } = testPuzzle({
      layout: [
        { row: 1, column: 1, borders: "T" },
        { row: 2, column: 2, borders: "" },
      ],
    });

    expect(() =>
      MoveBuilder.move(Players.Thomas, Moves.Up, initial.getPuzzle())
    ).toThrow();
  });

  test("Wolf second turn changes into Thomas", () => {
    const { initial, expected } = testPuzzle();
    initial.setTurn(Turns.Wolf2);
    expected.setTurn(Turns.Thomas);

    const result = MoveBuilder.move(
      Players.Wolf,
      Moves.Stay,
      initial.getPuzzle()
    );

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });

  test("Wolf moving out of turn throws", () => {
    const { initial } = testPuzzle();

    expect(() =>
      MoveBuilder.move(Players.Wolf, Moves.Right, initial.getPuzzle())
    ).toThrow();
  });

  test("Thomas moving out of turn throws", () => {
    const { initial } = testPuzzle();
    initial.setTurn(Turns.Wolf1);

    expect(() =>
      MoveBuilder.move(Players.Thomas, Moves.Right, initial.getPuzzle())
    ).toThrow();
  });

  test("Thomas moving to exit lets him escape", () => {
    const { initial, expected } = testPuzzle({
      layout: [
        { row: 1, column: 1, borders: "TLB" },
        { row: 1, column: 2, borders: "T" },
        { row: 2, column: 2, borders: "LBR" },
      ],
    });
    expected.setPlayer(Players.Thomas, 1, 2).calculateThomasState();

    const result = MoveBuilder.move(
      Players.Thomas,
      Moves.Up,
      initial.getPuzzle()
    );

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });

  test("Thomas fighting wolf gets him eaten", () => {
    const { initial, expected } = testPuzzle({
      layout: [
        { row: 1, column: 1, borders: "TLB" },
        { row: 1, column: 2, borders: "TRB" },
      ],
      thomas: { row: 1, column: 2 },
    });
    expected.setPlayer(Players.Thomas, 1, 2);
    expected.setPlayer(Players.Thomas, 1, 1).calculateThomasState();

    const result = MoveBuilder.move(
      Players.Thomas,
      Moves.Left,
      initial.getPuzzle()
    );

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });

  test("Wolf catching Thomas gets him eaten", () => {
    const { initial, expected } = testPuzzle({
      layout: [
        { row: 1, column: 1, borders: "TLB" },
        { row: 1, column: 2, borders: "TRB" },
      ],
      thomas: { row: 1, column: 2 },
    });
    initial.setTurn(Turns.Wolf1);
    expected
      .setTurn(Turns.Wolf2)
      .setPlayer(Players.Wolf, 1, 2)
      .calculateThomasState();

    const result = MoveBuilder.move(
      Players.Wolf,
      Moves.Right,
      initial.getPuzzle()
    );

    expect(result.getPuzzle()).toEqual(expected.getPuzzle());
  });
});
