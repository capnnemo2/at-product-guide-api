function makeProductsArray() {
  return [
    {
      id: 1,
      product_code: "ST",
      product_name: "Small Trellis",
      product_type: "trellis",
      mesh: [`4't x 1'w`],
      hard_three_eighths: [`1 x 11 1/4"`],
      hard_one_quarter: [`4 x 11 1/4"`],
      soft_three_eighths: [`1 x 20', bend @ 67", cut @ 134"`],
      prep_bend: [
        `Use the ST jig on the metal wheely table. Bend to 5-7" from jig.`
      ],
      prep_weld: [],
      weld: [`First weld: 12" from top.`]
    },
    {
      id: 2,
      product_code: "SA",
      product_name: "Small Arbor",
      product_type: "arbor",
      mesh: [`16't x 1'w`],
      hard_three_eighths: [`2 x 20', bend @ 135", cut @ 30"`, `2 x ~10 3/8"`],
      hard_one_quarter: [],
      soft_three_eighths: [],
      prep_bend: [
        `Use the circle jig table, bend on the fifth circle to the second hole`
      ],
      prep_weld: [],
      weld: [`First weld: 13 1/2"`]
    },
    {
      id: 3,
      product_code: "SB",
      product_name: "Small Ball",
      product_type: "topiary",
      mesh: [],
      hard_three_eighths: [],
      hard_one_quarter: [
        `1 x 10" ring (base)`,
        `1 x 9 1/8" (base)`,
        `1 x 16" (stem)`,
        `4 x 8" (foot spikes)`,
        `8 x 14" diameter (MG pieces)`
      ],
      soft_three_eighths: [],
      prep_bend: [
        `The 10" base rings get spun/bent on Mark's magic table motor. Use the jig that is marked for 1/4" to make 10" rings.`,
        `Use the compressed air cutter to cut the rings. Don't forget ear protection.`
      ],
      prep_weld: [
        `Weld the 10" base rings.`,
        `Mark all of the 9 1/8" base pieces in the center.`,
        `Weld the 16" stems to the 9 1/8" base pieces. Marty has a steel square so you can make a proper right angle. Hold it an extra moment so it cools straight.`,
        `Weld these T's into the rings, placing one weld on the ring connection weld. Eyeball it to make sure it stands up straight.`,
        `Weld the center rings with 2 x 14" diameter MG pieces.`
      ],
      weld: [
        `Brace the welded base piece on the edge of the table so that the ring part hangs off and the stem lies flat.`,
        `It can be helpful to mark a straight line across your table where the stem lies. This will help you keep your ball straight.`,
        `Line up the MG ring at the top of the stem. Marty has a heavy metal chunk with a handle that you should place on the ring before welding. This will keep it from moving once heated.`,
        `Weld MG ring to 16” stem.`,
        `Weld perpendicular (90 degree angle) 14” diameter MG piece.`,
        `Weld the in-between 2 x 14” diameter MG pieces (approx 45 degree angle).`,
        `Add the 4 x 8” foot spikes. Two can go under where the crosspiece of the base meets the base ring. The other two halfway around.`,
        `Flip the ball over so that the flat side of your MG faces up.`,
        `Weld on the remaining 3 x 14” diameter MG pieces exactly as you did the first side.`,
        `Backweld.`
      ]
    }
  ];
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
            products,
            comments
            RESTART IDENTITY CASCADE`
  );
}

module.exports = {
  makeProductsArray,
  cleanTables
};
