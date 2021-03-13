import express from "express";
import { MoveBuilder, PuzzleFactory, WolfMoveGenerator } from "./game";

const gameApi = express
  .Router()
  .post("/load", (req, res) =>
    res
      .status(200)
      .json(
        PuzzleFactory.fromConfigArray(req.body).map((puzzle) =>
          puzzle.getPuzzle()
        )
      )
  )
  .post("/move", (req, res) =>
    res
      .status(200)
      .json(
        MoveBuilder.move(
          req.body.player,
          req.body.move,
          req.body.puzzle
        ).getPuzzle()
      )
  )
  .post("/moveWolf", (req, res) =>
    res
      .status(200)
      .json({ move: WolfMoveGenerator(PuzzleFactory.fromPuzzle(req.body)) })
  );

// Number of arguments marks this function as error handling
// eslint-disable-next-line no-unused-vars
function errorHandling(error, req, res, next) {
  console.error(error); // eslint-disable-line no-console
  res.status(500).send();
}

const server = express()
  .use(express.json())
  .use("/game", gameApi)
  .use(errorHandling);

export default server;
