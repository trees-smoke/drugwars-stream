const db = require('../helpers/db');
const player = require('./player_handler');

const addToPool = (user, amount, cb) => {
  if (amount > 0 && !amount <= 0) {
    const day = new Date().getUTCDate();
    const month = new Date().getUTCMonth() + 1;
    const year = new Date().getUTCFullYear();
    const date = `${day}-${month}-${year}`;
    const query = `INSERT INTO heist (username, date, drugs) VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE drugs = drugs + ?`;
    db.query(query, [user.username, date, amount, amount], (err, result) => {
      if (err) return cb(null);
      player.removeDrugs(user.username, amount, success => {
        if (success) cb(`The user @${user.username} invested ${amount} in the heist`);
      });
    });
  } else {
    console.error(`Failed to invest ${amount} in heist for user @${user.username}`);
  }
};

module.exports = {
  addToPool,
};
