DROP TABLE IF EXISTS checkout CASCADE;

CREATE TABLE checkout (
  id SERIAL PRIMARY KEY NOT NULL,
  item_id INTEGER NOT NULL REFERENCES items(id)  ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  total_cost DECIMAL NOT NULL,
  order_id INTEGER  NOT NULL REFERENCES orders(id) ON DELETE CASCADE
);


-- CREATE INDEX FK_1 ON "order items"
-- (
--  "id",
--  name,
--  description,
--  Total,
--  user_id,
--  Completed_At
-- );
