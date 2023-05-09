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

const getUserInfo = function () {
  return db.query('SELECT orders.id, users.id, users.name, users.email, users.address, users.phone_number, users.credit_card FROM orders JOIN cart_items on orders.id = cart_items.order_id JOIN users ON orders.user_id = users.id;')
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
};

const getOrderDetails = function (order_id) {
  return db.query('SELECT * FROM cart_items WHERE order_id = $1', [order_id])
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
};


module.exports = { getMenuItems, addItemstoCart, getUserWithEmail, login, getUserInfo, getOrderDetails };
