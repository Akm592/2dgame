export default function mapData(){

const groundTiles = addLevel([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",

    "-------#######------",
    "dddddddddddddddddddd",


  ], {
    tileWidth: 16,
    tileHeight: 16,
    tiles: {
      "#": () => [
        sprite("ground-golden"),
        area(),
        body({ isStatic: true })
      ],
      "-": () => [
        sprite("ground-silver"),
        area(),
        body({ isStatic: true }),
      ],
      "d": () => [
        sprite("deep-ground"),
        area(),
        body({ isStatic: true })
      ],
    }
  })
  groundTiles.use(scale(4))

  const background = add([
    sprite("background"),
    z(-2),
    scale(4)
  ])
  background.add([
    sprite("trees"),
    z(-1),
  ])
  const shop = background.add([
    sprite("shop"),
    pos(170, 15),
  ])
  shop.play("default")

  // left invisible wall
  add([
    rect(16, 720),
    area(),
    body({ isStatic: true }),
    pos(-20, 0)
  ])
  // right invisible wall
  add([
    rect(16, 720),
    area(),
    body({ isStatic: true }),
    pos(1280, 0)
  ])
  background.add([
    sprite("fence"),
    pos(85, 125)
  ])
  background.add([
    sprite("fence"),
    pos(10, 125)
  ])
  background.add([
    sprite("sign"),
    pos(290, 115)
  ])
}