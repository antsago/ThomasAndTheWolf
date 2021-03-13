import express from "express";

const PORT = 3000 || process.env.PORT;

express()
  .get("/", (req, res) => res.send("Hello world"))
  .listen(PORT, () => console.log(`Server listening at port ${PORT}`));
