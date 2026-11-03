const path = require("path");
const sqlite = require("sqlite3");

const db = new sqlite.Database(
  path.resolve(__dirname, "../../database.db"),
  (error) => {
    if (error) {
      return console.error(error);
    }

    const sqlCategories = `CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(100) NOT NULL
        )`;

    // Tabla de usuarios: el email es único y la contraseña se guarda hasheada
    const sqlUsers = `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`;

    db.serialize(() => {
      db.run(sqlCategories, (error) => {
        if (error) {
          return console.error(error);
        }
      });

      db.run(sqlUsers, (error) => {
        if (error) {
          return console.error(error);
        }
      });
    });
  }
);

module.exports = db;
