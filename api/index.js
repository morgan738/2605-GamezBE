import express from "express";
export const router = express.Router();

import { gamezRouter } from "./gamez.js";

router.use("/gamez", gamezRouter);
