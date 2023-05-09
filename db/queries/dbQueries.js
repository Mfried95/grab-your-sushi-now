const db = require('../connection');

const getMenuItems = function () {
  return db.query('SELECT * from menu_items;')
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
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


module.exports = { getMenuItems, getUserInfo, getOrderDetails};

