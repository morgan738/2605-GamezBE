import client from "./client.js";
import { createGame } from "./gamez.js";

const seed = async () => {
  const SQL = `
        DROP TABLE IF EXISTS gamez;
        CREATE TABLE gamez(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL UNIQUE,
            description VARCHAR(1000),
            price INT,
            image VARCHAR(100)
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
  await createGame({ name: "god of war", description: "zeuuuuusssssssss", price: 60, image: null });
  await createGame({
    name: "resident evil requiem",
    description: "braiiinz",
    price: 70,
    image: null,
  });

  console.log("db tables created and seeded");
};

export default seed;
