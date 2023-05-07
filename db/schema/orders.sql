DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER  NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total DECIMAL NOT NULL,
  status BOOLEAN NOT NULL DEFAULT TRUE,
  completed_at TIMESTAMP NOT NULL
);


-- CREATE INDEX FK_1 ON Orders
-- (
--  "ID Primary",
--  Email,
--  password,
--  Name_1,
--  "Number"
-- );
