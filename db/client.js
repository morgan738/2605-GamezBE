import pg from "pg";
const client = new pg.Client(process.env.DATABASE_URL || "postgres://localhost/gamez_store");
export default client;
