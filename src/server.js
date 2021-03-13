import express from "express";
import { MoveBuilder, PuzzleFactory } from "./game";

const server = express()
  .use(express.json())
  .use(
    "/game",
    express
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
  )
  // Number of arguments mark this function as error handling
  // eslint-disable-next-line no-unused-vars
  .use((error, req, res, next) => {
    console.error(error); // eslint-disable-line no-console
    res.status(500).send();
  });

export default server;
