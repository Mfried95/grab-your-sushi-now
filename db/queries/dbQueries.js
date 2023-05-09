const db = require('../connection');

const getMenuItems = function() {
  return db.query('SELECT * from menu_items;')
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
};


const addItemstoCart = function () {
  return db.query('INSERT * INTO orders ');
    
};

module.exports = { getMenuItems, addItemstoCart };
