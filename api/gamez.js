import express from "express";
export const gamezRouter = express.Router();

import { fetchGamez, createGame, updateGame, deleteGame } from "../db/gamez.js";

gamezRouter.get("/", async (req, res, next) => {
  res.send(await fetchGamez());
});

gamezRouter.post("/", async (req, res, next) => {
  res.send(await createGame(req.body));
});

gamezRouter.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  res.send(await updateGame(req.body, +id));
});

gamezRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  res.status(204).send(await deleteGame(+id));
});
