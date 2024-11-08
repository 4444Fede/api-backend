import { Database } from "sqlite3";

const db = new Database("./express-validator/server/databases/users.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      fullname TEXT NOT NULL,
      role TEXT NOT NULL
    )
  `);

  db.run("PRAGMA busy_timeout = 5000");
  db.run("PRAGMA journal_mode = WAL");
});

export default db;
