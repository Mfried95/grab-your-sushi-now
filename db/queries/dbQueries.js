const db = require('../connection');

const getMenuItems = function() {
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
