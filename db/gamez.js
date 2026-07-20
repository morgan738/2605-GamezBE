import client from "./client.js";

export const createGame = async (newGame) => {
  const { name, description, price, image } = newGame;
  const SQL = `
        INSERT INTO gamez(name, description, price, image)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
  const response = await client.query(SQL, [name, description, price, image]);
  return response.rows[0];
};

export const fetchGamez = async () => {
  const SQL = `
        SELECT *
        FROM gamez
    `;
  const response = await client.query(SQL);
  return response.rows;
};

export const updateGame = async (updatedGame, id) => {
  const { name, description, price, image } = updatedGame;
  const SQL = `
        UPDATE gamez
        SET name = $1, description = $2, price = $3, image = $4
        WHERE id = $5
        RETURNING *
    `;
  const response = await client.query(SQL, [name, description, price, image, id]);
  return response.rows[0];
};

export const deleteGame = async (id) => {
  const SQL = `
    DELETE
    FROM gamez
    WHERE id = $1
    `;
  const response = await client.query(SQL, [id]);
};
