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
      // if (user.password === password) {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    })
    .catch(err => console.log(err));
};

//register
const register = function(name, email, password) {
  const hash = bcrypt.hashSync(password, 10);
  const values = [name, email, hash];
  return db.query(
    `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
    values
  )
    .then(res => {
      return res.rows[0];
    })
    .catch(err => console.log(err));
};


const getMenuItems = function() {
  return db.query('SELECT * from menu_items;')
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
};

const addItemsToOrders = function(values) {
  return db.query('INSERT INTO orders (user_id, total, completed_at) VALUES (2, $1, now()) RETURNING *', values)
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
};

const addItemstoCart = function(menu_item_id, quantity, total_cost, order_id) {
  let values = [menu_item_id, quantity, total_cost, order_id];
  return db.query('INSERT INTO cart_items(menu_item_id, quantity, total_cost, order_id) VALUES ($1, $2, $3, $4) RETURNING *', values)
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
};


const showOrdersToRestaurant = function() {
  return db.query(`select orders.id, users.name, menu_items.name, cart_items.quantity, cart_items.total_cost as items_price, orders.total, orders.status
                  from orders join cart_items on orders.id = cart_items.order_id JOIN users ON orders.user_id = users.id
                  join menu_items ON menu_items.id = cart_items.menu_item_id
                  WHERE orders.status = true;`)
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
};

const getUserInfo = function() {
  return db.query('SELECT users.id, users.name, users.email, users.address, users.phone_number, users.credit_card from users where id=2;')
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
};

const getUserOrderHistory = function() {
  return db.query('SELECT * from orders where user_id=2 order by completed_at desc limit 1;')
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
};

const getOrderDetails = function(order_id) {
  return db.query('SELECT * FROM cart_items WHERE order_id = $1', [order_id])
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
};

const addUser = function(values) {
  return db.query('INSERT INTO users (name, email, password, address, phone_number, credit_card) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;', values)
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
};


module.exports = { getMenuItems, addItemstoCart, getUserWithEmail, login, getUserInfo, getOrderDetails, register, addUser, addItemsToOrders, getUserOrderHistory };
