import PuzzleBuilder from "./PuzzleBuilder";

class PuzzleFactory {
  // Inputs should be run through some schema validator like yup or joi

  static fromConfig(config) {
    return new PuzzleBuilder(config.name, true)
      .addCells(config.layout)
      .calculateExits()
      .addThomas(config.thomas.row, config.thomas.column)
      .addWolf(config.wolf.row, config.wolf.column)
      .calculateGameState()
      .getPuzzle();
  }

  static fromConfigArray(configList) {
    return configList.map((config) => PuzzleFactory.fromConfig(config));
  }
}

export default PuzzleFactory;
