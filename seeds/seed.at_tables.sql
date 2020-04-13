BEGIN;

TRUNCATE
    products,
    comments
    RESTART IDENTITY CASCADE;

INSERT INTO products (product_code, product_name, product_type, mesh, hard_three_eighths, hard_one_quarter, soft_three_eighths, prep_bend, prep_weld, weld, img_src, img_alt) VALUES
    (
        'ST',
        'Small Trellis',
        'trellis',
        '{
            4''t x 1''w
        }',
        '{
            1 x 11 1/4\"
        }',
        '{
            4 x 11 1/4\"
        }',
        '{
            "1 x 20'', bend @ 67\", cut @ 134\""
        }',
        '{
            Use the ST jig on the metal wheely table. Bend to 5-7\" from jig.
        }',
        null,
        '{
            First weld: 12\" from top.
        }',
        'img_src',
        'small trellis'

    ),
    (
        'MT',
        'Medium Trellis',
        'trellis',
        '{
            5''t x 2''w
        }',
        '{
            "1 x 20'', bend @ 92\", cut @ 184\"",
            "1 x 23 1/4\""
        }',
        '{
            "3 x 16\"",
            "1 x 27\""
        }',
        null,
        '{
            Using the top circle on the circle jig table, bend the cut 1 x 20'' to the second hole, in the fifth circle.
        }',
        null,
        '{
            First weld: one foot spike length up from the bottom, weld mesh to 3/8\".
        }',
        'img_src',
        'medium trellis'
    ),
    (
        'LT',
        'Large Trellis',
        'trellis',
        '{
            5''t x 3''w
        }',
        '{
            "1 x 20'', bend @ 101 1/2\", cut @ 203\"",
            "1 x 35 1/4\""
        }',
        '{
            "3 x 24\"",
            "1 x 36\""
        }',
        null,
        '{
            Using the second circle on the circle jig table, bend the cut 1 x 20'' to second hole, in the fifth circle.
        }',
        null,
        '{
            First weld: one foot spike length up from the bottom, weld mesh to 3/8\".
        }',
        'img_src',
        'large trellis'
    ),
    (
        'XT',
        'Extra Large Trellis',
        'trellis',
        '{
            5''8\"t x 4''w
        }',
        '{
            "1 x 20'', cut @ 3\", bend @ 121 1/2\"",
            "1 x 47 1/4\""
        }',
        '{
            "3 x 27\"",
            1 x 47\"
        }',
        null,
        '{
            Using the third circle on the circle jig table, bend the cut 1 x 20'' to the second hole, in the fifth circle.
        }',
        '{
            Add a piece of 3/8\" with a stopper crosspiece at the end of your table so that the entire bent 1 x 20'' can rest on your table with only the bottom hanging off the edge.
        }',
        '{
            First weld: one foot spike length up from the bottom, weld mesh to 3/8\". 
        }',
        'img_src',
        'extra large trellis'
    ),
    (
        'FT51',
        'Flat Top Trellis 5x1',
        'trellis',
        '{
            5''t x 1''w
        }',
        '{
            "2 x 6''",
            "2 x 11 1/4\""
        }',
        null,
        null,
        null,
        null,
        '{
            "Weld the 3/8\" together.",
            "Weld the mesh to the 3/8\"",
            "Weld all of the top mesh to the 3/8\" before completing the side.",
            "Add the other 6'' piece of 3/8\".",
            "Again, weld the 3/8\" before welding the mesh to the 3/8\".",
            "Add bottom crosspiece.",
            "Back weld 3/8\""
        }',
        'img_src',
        'ft51'
    ),
    (
        'FT52',
        'Flat Top Trellis 5x2',
        'trellis',
        '{
            5''t x 2''w
        }',
        '{
            "2 x 6''",
            "2 x 23 1/4\""
        }',
        null,
        null,
        null,
        null,
        '{
            "Standard trellis welding. See FT51 for guidance"
        }',
        'img_src',
        'ft52'
    ),
    (
        'FT53',
        'Flat Top Trellis 5x3',
        'trellis',
        '{
            5''t x 3''w
        }',
        '{
            "2 x 6''",
            "2 x 35 1/4\""
        }',
        null,
        null,
        null,
        null,
        '{
            "Standard trellis welding. See FT51 for guidance"
        }',
        'img_src',
        'ft53'
    ),
    (
        'FT54',
        'Flat Top Trellis 5x4',
        'trellis',
        '{
            5''t x 4''w
        }',
        '{
            "2 x 6''",
            "2 x 47 1/4\""
        }',
        null,
        null,
        null,
        null,
        '{
            "Standard trellis welding. See FT51 for guidance"
        }',
        'img_src',
        'ft54'
    ),
    (
        'CT',
        'Corner Trellis',
        'trellis',
        '{
            2 x (6''t x 2''w)
        }',
        '{
            "1 x 10''",
            "3 x 7''",
            "4 x 23 1/4\""
        }',
        '{
            3 x 27\"
        }',
        null,
        '{
            "Use LT jig, bend the 1 x 10'' to the sixth circle jig.",
            "Cut 31\" from both sides."
        }',
        null,
        '{
            "Weld an FT62.",
            "Weld the top and one side of a second FT62",
            "Hang the first FT62 off the the side of your table so it hangs straight down.",
            "Position your second partial FT62 so it is at a 90 degree angle to the first.",
            "Weld them together, adding the second bottom crosspiece.",
            "Put the CT on the table like a tent.",
            "Weld your bent half circle to the top outermost corners.",
            "Weld your quarter inch steel: center first, centering the left and right pieces.",
            "Cut excess quarter inch and weld.",
            "Back weld."
        }',
        'img_src',
        'corner trellis'
    ),
    (
        'CT71',
        'Corner Trellis 7x1',
        'trellis',
        '{
            2 x (7''t x 1''w)
        }',
        '{
            "3 x 8''",
            "4 x 11 1/4\""
        }',
        null,
        null,
        null,
        null,
        '{
            "Weld an FT71.",
            "Weld the top and one side of a second FT71.",
            "Hang the full FT71 off the edge of your table so it hangs straight down.",
            "Weld the partial FT71 to the hanging one so that they create a 90 degree angle.",
            "Add the second bottom crosspiece.",
            "Back weld."
        }',
        'img_src',
        'ct71'
    ),
    (
        'SA',
        'Small Arbor',
        'arbor',
        '{
            16''t x 1''w
        }',
        '{
            "2 x 20'', bend @ 135\", cut @ 30\"",
            "2 x 10 3/8\""
        }',
        null,
        null,
        '{
            Use the circle jig table, bend on the third circle to the second hole.
        }',
        null,
        '{
            First weld: 13 1/2\".
        }',
        'img_src',
        'small arbor'
    ),
    (
        'MA',
        'Medium Arbor',
        'arbor',
        '{
            16''8\"t x 1''8\"w
        }',
        '{
            "2 x 20'', bend @ 130\", cut @ 20\"",
            "2 x 18 3/4\""
        }',
        null,
        null,
        '{
            Use the circle jig table, bend on the fourth circle to the second hole.
        }',
        null,
        '{
            First weld: 14 1/2\".
        }',
        'img_src',
        'medium arbor'
    ),
    (
        'LA',
        'Large Arbor',
        'arbor',
        '{
            17''4\"t x 2''4\"w
        }',
        '{
            "2 x 20'', bend @ 124\", cut @ 8\"",
            "2 x 26 3/4\""
        }',
        null,
        null,
        '{
            Use the circle jig table, bend on the fifth circle to the second hole.
        }',
        null,
        '{
            First weld: 16\"
        }',
        'img_src',
        'large arbor'
    ),
    (
        'XLA',
        'Extra Large Arbor',
        'arbor',
        '{
            18''t x 3''w
        }',
        '{
            "2 x 20'', bend @ 120\"",
            "2 x 34 1/4\""
        }',
        null,
        null,
        '{
            Use the circle jig table, bend on the fifth circle to the hash marks on the fith circle. They are approximately 20\" apart.
        }',
        null,
        '{
            First weld: 16\"
        }',
        'img_src',
        'extra large arbor'
    ),
    (
        'SB',
        'Small Ball',
        'topiary',
        null,
        null,
        '{
            "1 x 10\" ring (base)",
            "1 x 9 1/8\" (base)",
            "1 x 16\" (stem)",
            "4 x 8\" (foot spikes)",
            "8 x 14\" diameter (MG pieces)"
        }',
        null,
        '{
            "The 10\" base rings get spun/bent on Mark''s magic table motor. Use the jig that is marked for 1/4\" to make 10\" rings.",
            "Use the compressed air cutter to cut the rings. Don''t forget ear protection."
        }',
        '{
            "Weld the 10\" base rings.",
            "Mark all of the 9 1/8\" base pieces in the center.",
            "Weld the 16\" stems to the 9 1/8\" base pieces. Marty has a steel square so you can make a proper right angle. Hold it an extra moment so it cools straight.",
            "Weld these T''s into the rings, placing one weld on the ring connection weld. Eyeball it to make sure it stands up straight.",
            "Weld the center rings with 2 x 14\" diameter MG pieces."
        }',
        '{
            "Brace the welded base piece on the edge of the table so that the ring part hangs off and the stem lies flat.",
            "It can be helpful to mark a straight line across your table where the stem lies. This will help you keep your ball straight.",
            "Line up the MG ring at the top of the stem. Marty has a heavy metal chunk with a handle that you should place on the ring before welding. This will keep it from moving once heated.",
            "Weld MG ring to 16\” stem.",
            "Weld perpendicular (90 degree angle) 14\” diameter MG piece.",
            "Weld the in-between 2 x 14\” diameter MG pieces (approx 45 degree angle).",
            "Add the 4 x 8\” foot spikes. Two can go under where the crosspiece of the base meets the base ring. The other two halfway around.",
            "Flip the ball over so that the flat side of your MG faces up.",
            "Weld on the remaining 3 x 14\” diameter MG pieces exactly as you did the first side.",
            "Backweld."
        }',
        'img_src',
        'small ball'
    ),
    (
        'LB',
        'Large Ball',
        'topiary',
        null,
        '{
            "1 x 14\" ring (base)",
            "1 x 13 1/8\" (base)",
            "1 x 24\" (stem)"
        }',
        '{
            "4 x 8\" (foot spikes)",
            "8 x 18\" diameter pieces (LG)"
        }',
        null,
        '{
            "The 14\” base rings get spun/bent on Mark''s magic table motor. You need the jig that is marked for 3/8\" to make 14\” rings.",
            "Use the compressed air cutter to cut the rings. Don''t forget ear protection."
        }',
        '{
            "Weld the 14\" base rings.",
            "Mark all of the 13 1/8\" base pieces in the center.",
            "Weld the 24\" stems to the 13 1/8\" base pieces. Marty has a steel square so that you can be sure that you’re making a right angle each time. Hold it an extra moment so that it cools straight.",
            "Weld the new T''s into the rings. One weld will go where the ring join weld already is. Eyeball it to make sure that it stands up straight.",
            "Weld the center rings with 2 x 18\” diameter LG pieces."
        }',
        '{
            "Brace the welded base piece on the edge of the table so that the ring part hangs off and the stem lies flat.",
            "It can be helpful to mark a straight line across your table where the stem lies. This will help you keep your ball straight.",
            "Line up the LG ring at the top of the stem. Marty has a heavy metal chunk with a handle that you should place on the ring before welding. This will keep it from moving once heated.",
            "Weld LG ring to 24\” stem.",
            "Weld perpendicular (90 degree angle) 18\” diameter LG piece.",
            "Weld the in-between 2 x 18\” diameter LG pieces (45 degree angle).",
            "Add the 4 x 8\” foot spikes. Two can go under where the crosspiece of the base meets the base ring. The other two halfway around.",
            "Flip the ball over so that the flat side of your LG faces up.",
            "Weld on the remaining 3 x 18\” diameter LG pieces exactly as you did the first side.",
            "Back weld."
        }',
        'img_src',
        'large ball'
    ),
    (
        'DB',
        'Double Ball',
        'topiary',
        null,
        '{
            "1 x 14\" ring (base)",
            "1 x 13 1/8\" (base)",
            "1 x 6\" (stem)",
            "1 x 14\" (stem)"
        }',
        '{
            "4 x 8\" (foot spikes)",
            "8 x 18\" diameter pieces (LG)",
            "8 x 14\" diameter pieces (MG)"
        }',
        null,
        '{
            "The 14\” base rings get spun/bent on Mark''s magic table motor. You need the jig that is marked for 3/8\” to make 14\” rings.",
            "Use the compressed air cutter that is in the bay with the stamp/shear to cut the rings. Don''t forget ear protection.",
            "Gather the LG and MG parts."
        }',
        '{
            "Weld the 14\" base rings.",
            "Mark all of the 13 1/8\" base pieces in the center.",
            "Weld the 14\” stems to the 13 1/8\" base pieces. Marty has a steel square so that you can be sure that you’re making a right angle each time. Hold it an extra moment so that it cools straight.",
            "Weld the new T''s into the rings. One weld will go where the ring join weld already is.",
            "Eyeball it to make sure that it stands up straight.",
            "Weld the center rings with 2 x 18\” diameter LG pieces.",
            "Weld the center rings with 2 x 14\” diameter MG pieces."
        }',
        '{
            "Brace the welded base piece on the edge of the table so that the ring part hangs off and the stem lies flat.",
            "It can be helpful to mark a straight line across your table where the stem lies. This will help you keep your ball straight.",
            "Line up the LG ring at the top of the 14\” stem. Marty has a heavy metal chunk with a handle that you should place on the ring on the opposite end that you’re welding. This will help keep it from moving as it cools.",
            "Weld LG ring to 14\” stem.",
            "Line up the 6\” stem piece above the LG ring. This is where having that straight line on the table is extra helpful.",
            "Weld the 6\” stem piece to the LG ring. Again, hold it for an extra moment to be sure that it cools straight.",
            "Place the MG ring above the 6” stem, again utilizing your line to keep everything straight.",
            "Use the metal chuck with the handle again to keep the ring in place for when it cools.",
            "Weld the MG ring to the 6\” stem.",
            "Weld perpendicular (90 degree angle) 18\” diameter LG piece.",
            "Weld the in-between 2 x 18\” diameter LG pieces (45 degree angle).",
            "Weld perpendicular 14\” diameter MG piece.",
            "Weld the in-between 2 x 14\” MG pieces (45 degree angle).",
            "Add the 4 x 8\” foot spikes. Two can go under where the crosspiece of the base meets the base ring. The other two halfway around.",
            "Flip the ball over so that the flat side of your LG and MG face up.",
            "Weld on the remaining 3 x 18\” diameter LG pieces and 3 x 14\” diameter MG pieces exactly as you did the first side.",
            "Back weld."
        }',
        'img_src',
        'double ball'
    ),
    (
        'TB',
        'Triple Ball',
        'topiary',
        null,
        '{
            "1 x 14\" ring (base)",
            "1 x 13 1/8\" (base)",
            "3 x 6\" (stem)"
        }',
        '{
            "4 x 8\" (foot spikes)",
            "8 x 18\" diameter pieces (LG)",
            "8 x 14\" diameter pieces (MG)",
            "8 x 10\" diameter pieces (SG)"
        }',
        null,
        '{
            "The 14\" base rings get spun/bent on Mark''s magic table motor. You need the jig that is marked for 3/8\" to make 14\” rings.",
            "Use the compressed air cutter that is in the bay with the stamp/shear to cut the rings. Don''t forget ear protection.",
            "Gather the LG, MG, and SG parts."
        }',
        '{
            "Weld the 14\" base rings.",
            "Mark all of the 13 1/8\" base pieces in the center.",
            "Weld a 6\” stem to the 13 1/8\" base pieces. Marty has a steel square so that you can be sure that you’re making a right angle each time. Hold it an extra moment so that it cools straight.",
            "Weld the new T''s into the rings. One weld will go where the ring join weld already is. Eyeball it to make sure that it stands up straight.",
            "Weld the center rings with 2 x 18\” diameter LG pieces.",
            "Weld the center rings with 2 x 14\” diameter MG pieces.",
            "Weld the center rings with 2 x 10\” diameter SG pieces."
        }',
        '{
            "Brace the welded base piece on the edge of the table so that the ring part hangs off and the stem lies flat.",
            "It can be helpful to mark a straight line across your table where the stem lies. This will help you keep your ball straight.",
            "Line up the LG ring at the top of the 6\” stem. Marty has a heavy metal chunk with a handle that you should place on the ring on the opposite end that you’re welding. This will help keep it from moving as it cools.",
            "Weld LG ring to 6\” stem.",
            "Line up a 6\” stem piece above the LG ring. This is where having that straight line on the table is extra helpful.",
            "Weld the 6\” stem piece to the LG ring. Again, hold it for an extra moment to be sure that it cools straight.",
            "Place the MG ring above the 6\” stem, again utilizing your line to keep everything straight.",
            "Use the metal chuck with the handle again to keep the ring in place for when it cools.",
            "Weld the MG ring to the 6\” stem.",
            "Line up the last 6\” stem piece above the MG ring. The straight line is your friend.",
            "Weld the 6\” stem piece to the MG ring.  Again, hold it for an extra moment to be sure that it cools straight.",
            "Place the SG ring above the 6\” stem, making sure it is also straight. Use the metal chuck with the handle again to keep the ring in place for when it cools.",
            "Weld the SG ring to the 6\” stem.",
            "Weld perpendicular (90 degree angle) 18\” diameter LG piece.",
            "Weld the in-between 2 x 18\” diameter LG pieces (45 degree angle).",
            "Weld perpendicular (90 degree angle) 14\” diameter MG piece.",
            "Weld the in-between 2 x 14\” MG pieces (45 degree angle).",
            "Weld perpendicular (90 degree angle) 10\” diameter SG piece.",
            "Weld the in-between 2 x 10\” SG pieces (45 degree angle).",
            "Add the 4 x 8\” foot spikes. Two can go under where the crosspiece of the base meets the base ring. The other two halfway around.",
            "Flip the ball over so that the flat side of your LG and MG face up.",
            "Weld on the remaining 3 x 18\” diameter LG pieces, 3 x 14\” diameter MG pieces, and 3 x 10\” diameter SG pieces exactly as you did the first side.",
            "Back weld."
        }',
        'img_src',
        'triple ball'

    );

INSERT INTO comments (user_name, content, product_id) VALUES
    ('Ben', 'This is the first comment', 1);

COMMIT;