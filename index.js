import express from "express";
import client from "./db/client.js";
import seed from "./db/seed.js";
import { router } from "./api/index.js";
const app = express();
app.use(express.json());
app.use("/api", router);

const init = async () => {
  await client.connect();
  console.log("connected to db");
  if (process.env.SYNC) await seed();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
};

init();
