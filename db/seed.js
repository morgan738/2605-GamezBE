import client from "./client.js";
import { createGame } from "./gamez.js";
import { createUser } from "./users.js";
import { createFavorite, deleteFavorite, fetchFavoritez } from "./favoritez.js";

const seed = async () => {
  const SQL = `
        DROP TABLE IF EXISTS users CASCADE;
        DROP TABLE IF EXISTS gamez CASCADE;
        DROP TABLE IF EXISTS favoritez CASCADE;
        CREATE TABLE users(
          id UUID PRIMARY KEY,
          username VARCHAR(100)
        );
        CREATE TABLE gamez(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL UNIQUE,
            description VARCHAR(1000),
            price INT,
            image VARCHAR(100)
            
        );
        CREATE TABLE favoritez(
          fav_id UUID PRIMARY KEY,
          game_id INT REFERENCES gamez(id) NOT NULL,
          user_id UUID REFERENCES users(id) NOT NULL,
          CONSTRAINT gamez_and_user_combo UNIQUE(game_id, user_id)
        );


        INSERT INTO gamez(name, description, price, image) VALUES ('Trails in the Sky', 'Bracers', 60, null);
    `;

  await client.query(SQL);

  /*   await Promise.all([
      createGame(),
      createGame(),
      createGame(),
      createGame()
  
    ]) */
  const morgan = await createUser({ username: "morgan" });
  const cory = await createUser({ username: "cory" });
  const raven = await createUser({ username: "raven" });

  const gow = await createGame({
    name: "god of war",
    description: "zeuuuuusssssssss",
    price: 60,
    image: null,
  });
  const requiem = await createGame({
    name: "resident evil requiem",
    description: "braiiinz",
    price: 70,
    image: null,
  });

  await createFavorite({ game_id: gow.id, user_id: raven.id });
  await createFavorite({ game_id: requiem.id, user_id: raven.id });
  await createFavorite({ game_id: gow.id, user_id: cory.id });
  const morganGowFav = await createFavorite({ game_id: gow.id, user_id: morgan.id });
  //await deleteFavorite({ fav_id: morganGowFav.fav_id, user_id: morgan.id });

  await fetchFavoritez(raven.id);

  console.log("db tables created and seeded");
};

export default seed;
