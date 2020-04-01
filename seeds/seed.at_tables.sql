BEGIN;

TRUNCATE
    at_products,
    at_comments
    RESTART IDENTITY CASCADE;

INSERT INTO at_products (product_code, product_name, product_type, mesh, hard_three_eighths, hard_one_quarter, soft_three_eighths, prep_bend, prep_weld, weld) VALUES
    ('ST', 'Small Trellis', 'trellis', {`4't x 1'w`}, {`1 x 11 1/4"`}, {`4 x 11 1/4"`}, {`1 x 20', bend @ 67", cut @ 134"`}, {`Use the ST jig on the metal wheely table. Bend to 5-7" from jig.`}, null, {`First weld: 12" from top.`});

INSERT INTO at_comments (user_name, content, product_id) VALUES
    ('Ben', 'This is the first comment', 1);

COMMIT;