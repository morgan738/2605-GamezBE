import client from "./client.js";
import { v4 } from "uuid";
const uuidv4 = v4;

export const createFavorite = async (favorite) => {
  const SQL = `
        INSERT INTO favoritez(fav_id, game_id, user_id)
        VALUES($1, $2, $3)
        RETURNING *
    `;
  const response = await client.query(SQL, [uuidv4(), favorite.game_id, favorite.user_id]);
  return response.rows[0];
};

export const deleteFavorite = async (favorite) => {
  const SQL = `
        DELETE from favoritez
        WHERE fav_id = $1 AND user_id = $2
    `;
  await client.query(SQL, [favorite.fav_id, favorite.user_id]);
};

export const fetchFavoritez = async (userId) => {
  const SQL = `
        SELECT favoritez.fav_id, gamez.* FROM favoritez
        INNER JOIN gamez ON favoritez.game_id = gamez.id
        WHERE favoritez.user_id = $1
    `;
  const response = await client.query(SQL, [userId]);
  console.log(response.rows);
  return response.rows;
};
