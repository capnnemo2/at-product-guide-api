CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_code TEXT NOT NULL,
    product_name TEXT NOT NULL,
    product_type TEXT NOT NULL,
    mesh TEXT [],
    hard_three_eighths TEXT [],
    hard_one_quarter TEXT [],
    soft_three_eighths TEXT [],
    prep_bend TEXT [],
    prep_weld TEXT [],
    weld TEXT [],
    img_src TEXT,
    img_alt TEXT
);