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

//register
const register = function(name, email, password) {
  const hash = bcrypt.hashSync(password, 10);
  const values = [name, email, hash];
  return db
    .query(
      `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      values
    )
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => console.log(err));
};


const getMenuItems = function () {
  return db.query('SELECT * from menu_items;')
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
};


const addItemstoCart = function (userId, itemId, quantity) {
  const itemQuery = `
    SELECT name, cost
    FROM menu_items
    WHERE id = $1
  `;
  return db.query(itemQuery, [itemId])
    .then(result => {
      const itemName = result.rows[0].name;
      const itemCost = result.rows[0].cost;
      const totalCost = itemCost * quantity;
      const insertQuery = `
        INSERT INTO orders (user_id, item_name, item_quantity, item_cost, total)
        VALUES ($1, $2, $3, $4, $5)
      `;
      return db.query(insertQuery, [userId, itemName, quantity, itemCost, totalCost]);
    });
};




module.exports = { getMenuItems, addItemstoCart };
