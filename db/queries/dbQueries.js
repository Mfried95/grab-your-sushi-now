const db = require('../connection');
const bcrypt = require("bcryptjs");

//Get user info with email
const getUserWithEmail = email => {
  return db
    .query(`
  SELECT * FROM users WHERE email = $1;`, [email]
    )
    .then(res => res.rows[0]);
};


//login
const login = function(email, password) {
  return getUserWithEmail(email)
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    })
    .catch(err => console.log(err));
};


const getMenuItems = function () {
  return db.query('SELECT * from menu_items;')
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
};

const addItemstoCart = function() {
  return db.query('INSERT * INTO orders ');

};



module.exports = { getMenuItems, addItemstoCart, getUserWithEmail, login };
