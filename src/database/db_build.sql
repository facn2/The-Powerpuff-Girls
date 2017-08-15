BEGIN;

DROP TABLE IF EXISTS books, users cascade;

CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	username TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL

);

CREATE TABLE books(
  id SERIAL PRIMARY KEY,
  book_name TEXT NOT NULL,
  author TEXT NOT NULL,
  user_id INTEGER,
  cover_url TEXT NOT NUll
);

INSERT INTO users(username, password) VALUES
  ('Blossom', 'blossom00bunny'), ('Bubbles', 'PeanutButter')
RETURNING ID;

INSERT INTO books(book_name, author, user_id, cover_url) VALUES
  ('Harry Potter Philosophers Stone', 'J.K Rowling', 1, 'https://images-na.ssl-images-amazon.com/images/I/818PicDErkL.jpg'),
  ('Sapiens', 'Lubel', 2, 'https://images-na.ssl-images-amazon.com/images/I/71oObFP5pcL.jpg')
RETURNING ID;

COMMIT;