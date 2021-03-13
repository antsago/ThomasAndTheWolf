import express from "express";
import { PuzzleFactory } from "./game";

const server = express()
  .use(express.json())
  .post("/game/load", (req, res) =>
    res
      .status(200)
      .json(
        PuzzleFactory.fromConfigArray(req.body).map((puzzle) =>
          puzzle.getPuzzle()
        )
      )
  )
  // Number of arguments mark this function as error handling
  // eslint-disable-next-line no-unused-vars
  .use((error, req, res, next) => {
    console.error(error); // eslint-disable-line no-console
  });

export default server;
