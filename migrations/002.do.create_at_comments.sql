CREATE TABLE at_comments (
    id SERIAL PRIMARY KEY,
    user_name TEXT NOT NULL,
    content TEXT NOT NULL,
    product_id INTEGER REFERENCES at_products(id) ON DELETE CASCADE NOT NULL
);