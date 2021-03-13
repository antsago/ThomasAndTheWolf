import express from "express";

const server = express().get("/", (req, res) => res.send("Hello world"));

export default server;
