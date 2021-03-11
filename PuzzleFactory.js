import PuzzleBuilder from "./PuzzleBuilder";

class PuzzleFactory {
  // Inputs should be run through some schema validator like yup or joi

  static fromConfig(config) {
    return new PuzzleBuilder(config.name, true)
      .addCells(config.layout)
      .calculateExits()
      .addThomas(config.thomas.row, config.thomas.column)
      .addWolf(config.wolf.row, config.wolf.column)
      .calculateGameState();
  }

  static fromConfigArray(configList) {
    return configList.map((config) => PuzzleFactory.fromConfig(config));
  }

  static fromPuzzle(original) {
    const copy = new PuzzleBuilder(original.name, original.isThomasTurn);
    copy.layout = original.layout;
    copy.thomas = original.thomas;
    copy.wolf = original.wolf;
    copy.thomasState = original.thomasState;

    return copy;
  }
}

export default PuzzleFactory;
