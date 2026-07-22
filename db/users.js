import client from "./client.js";
import { v4 } from "uuid";
const uuidv4 = v4;

export const createUser = async (user) => {
  const SQL = `
        INSERT INTO users (id, username)
        VALUES ($1, $2)
        RETURNING *
    `;

  const response = await client.query(SQL, [uuidv4(), user.username]);
  return response.rows[0];
};
