import PuzzleBuilder from "./PuzzleBuilder";
import { Players, Turns } from "./constants";

class PuzzleFactory {
  // Inputs should be run through some schema validator like yup or joi

  static fromConfig(config) {
    return new PuzzleBuilder(config.name)
      .addCells(config.layout)
      .calculateExits()
      .setPlayer(Players.Thomas, config.thomas.row, config.thomas.column)
      .setPlayer(Players.Wolf, config.wolf.row, config.wolf.column)
      .setTurn(Turns.Thomas)
      .calculateThomasState();
  }

  static fromConfigArray(configList) {
    return configList.map((config) => PuzzleFactory.fromConfig(config));
  }

  static fromPuzzle(original) {
    const copy = new PuzzleBuilder(original.name, original.turn);
    copy.layout = original.layout;
    copy[Players.Thomas] = original.thomas;
    copy[Players.Wolf] = original.wolf;
    copy.turn = original.turn;
    copy.thomasState = original.thomasState;

    return copy;
  }
}

export default PuzzleFactory;
