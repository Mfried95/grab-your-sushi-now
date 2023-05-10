const db = require('../connection');

console.log("connected!!");

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
};


module.exports = { getUsers };
