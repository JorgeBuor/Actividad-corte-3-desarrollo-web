const db = require("./sqlite");

const create = (name, email, password, callback) => {
  const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

  db.run(sql, [name, email, password], function (error) {
    if (error) {
      return callback(error);
    }

    callback(null, this.lastID);
  });
};

const findByEmail = (email, callback) => {
  const sql = `SELECT * FROM users WHERE email = ?`;

  db.get(sql, [email], (error, row) => {
    if (error) {
      return callback(error);
    }

    callback(null, row);
  });
};

module.exports = {
  create,
  findByEmail,
};
