import PuzzleBuilder from "./PuzzleBuilder";
import { Players } from "./constants";

class PuzzleFactory {
  // Inputs should be run through some schema validator like yup or joi

  static fromConfig(config) {
    return new PuzzleBuilder(config.name, true)
      .addCells(config.layout)
      .calculateExits()
      .setPlayer(Players.Thomas, config.thomas.row, config.thomas.column)
      .setPlayer(Players.Wolf, config.wolf.row, config.wolf.column)
      .calculateGameState();
  }

  static fromConfigArray(configList) {
    return configList.map((config) => PuzzleFactory.fromConfig(config));
  }

  static fromPuzzle(original) {
    const copy = new PuzzleBuilder(original.name, original.isThomasTurn);
    copy.layout = original.layout;
    copy[Players.Thomas] = original[Players.Thomas];
    copy[Players.Wolf] = original[Players.Wolf];
    copy.thomasState = original.thomasState;

    return copy;
  }
}

export default PuzzleFactory;
