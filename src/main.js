import kaboom from "kaboom"
import platformer from "./platformer"
import mapData from "./map"

import loadAssets from "./assets"
import makePlayer from "./players"
import scene_joinRoom from "./joinRoom"
import scene_login from "./login"







kaboom({
  //width: 1280,
  // height: 720,
  background: [119, 113, 110],
  // stretch: true,
  //letterbox: true,
})
loadAssets()


scene("fight", () => {
  mapData()

  const players = [];
  // create player objects

  for (let i = 1; i <= 2; i++) {
    const player = makePlayer(200 + i * 300, 100, 16, 42, 4, "player" + i);
    player.use(sprite(player.sprites.idle));
    player.play("idle");
    players.push(player);
    console.log(players);
   
  }
  conn.on("playerJoined", (id, x, y) => {
    const player = makePlayer(x, y, 16, 42, 4, id);
    players.push(player);
  });
  
  function run(player, speed, flipPlayer) {
    if (player.health === 0) {
      return;
    }

    if (player.curAnim() !== "run"
      && !player.isCurrentlyJumping) {
      player.use(sprite(player.sprites.run))
      player.play("run")
    }
    player.move(speed, 0)
    player.flipX = flipPlayer

    // emit player position to server
    const { x, y } = player.pos;
    //conn.emit("playerMoved", player.id, x, y);
  }

  function resetPlayerToIdle(player) {
    player.use(sprite(player.sprites.idle))
    player.play("idle")

    // emit player position to server
    const { x, y } = player.pos;
    conn.emit("playerMoved", player.id, x, y);
  }

  // add keyboard controls for player movement
  onKeyDown("d", () => {

    run(players[0], 500, false)
   

  })
  onKeyDown("right", () => {
    run(players[1], 500, false)
  })
  onKeyRelease("d", () => {
    if (players[0].health !== 0) {
      resetPlayerToIdle(players[0])
      players[0].flipX = false
      //conn.emit("playerFlipped", players[0].id, false)
    }
  })
  onKeyRelease("right", () => {
    if (players[1].health !== 0) {
      resetPlayerToIdle(players[1])
      players[1].flipX = false
      //conn.emit("playerFlipped", players[1].id, false)
    }
  })

  onKeyDown("a", () => {
    run(players[0], -500, true)
  
  })
  onKeyDown("left", () => {
    run(players[1], -500, true)
   
  })


  onKeyRelease("a", () => {
    if (players[0].health !== 0) {
      resetPlayerToIdle(players[0])
      players[0].flipX = true
      //conn.emit("playerFlipped", players[0].id, true)
    }
  })
  onKeyRelease("left", () => {
    if (players[1].health !== 0) {
      resetPlayerToIdle(players[1])
      players[1].flipX = true
      //conn.emit("playerFlipped", players[1].id, true)
    }
  })
  function makeJump(player) {
    if (player.health === 0) {
      return
    }

    if (player.isGrounded()) {
      const currentFlip = player.flipX
      player.jump()
      player.use(sprite(player.sprites.jump))
      player.flipX = currentFlip
      player.play("jump")
      player.isCurrentlyJumping = true

      // emit player position to server
      const { x, y } = player.pos;
      //conn.emit("playerJumped", player.id, x, y);
    }
  }

  function resetAfterJump(player) {
    if (player.isGrounded() && player.isCurrentlyJumping) {
      player.isCurrentlyJumping = false
      if (player.curAnim() !== "idle") {
        resetPlayerToIdle(player)
      }

      // emit player position to server
      const { x, y } = player.pos;
     
    }
  }


  onKeyDown("w", () => {
    makeJump(players[0])
  })

  players[0].onUpdate(() => resetAfterJump(players[0]))

  function attack(player, excludedKeys) {
    if (player.health === 0) {
      return
    }

    for (const key of excludedKeys) {
      if (isKeyDown(key)) {
        return
      }
    }

    const currentFlip = player.flipX
    if (player.curAnim() !== "attack") {
      player.use(sprite(player.sprites.attack))
      player.flipX = currentFlip
      const slashX = player.pos.x + 30
      const slashXFlipped = player.pos.x - 350
      const slashY = player.pos.y - 200
      add([

        rect(300, 300),
        area(),
        pos(currentFlip ? slashXFlipped : slashX, slashY),
        opacity(0),
        player.id + "attackHitbox",

        {
          damage: 50,
          fromPlayer: player.id
        }
      ])
      player.play("attack", {
        onEnd: () => {
          resetPlayerToIdle(player)
          player.flipX = currentFlip
          // emit attack event to server
          //     conn.emit("playerAttack", player.id);
        }
      })


    }
  }
  camScale(1.4)
  onKeyDown("space", () => {
    attack(players[0], ["w"])
  })
  onKeyRelease("space", () => {
    destroyAll(players[0].id + "attackHitbox")
  })
  onKeyDown("enter", () => {
    wait(3, () => {
      go("home")
    })

  })

})

const centerX = width() / 2;
const centerY = height() / 2;


// function to create a button with text
function addButton(txt, p, f) {

  // add a parent background object
  const btn = add([
    rect(240, 80, { radius: 8 }),
    pos(p),
    area(),
    scale(1),
    anchor("center"),
    outline(4),
  ])

  // add a child object that displays the text
  btn.add([
    text(txt),
    anchor("center"),
    color(0, 0, 0),
  ])

  // onHoverUpdate() comes from area() component
  // it runs every frame when the object is being hovered
  btn.onHoverUpdate(() => {
    const t = time() * 10
    btn.color = hsl2rgb((t / 10) % 1, 0.6, 0.7)
    btn.scale = vec2(1.2)
    setCursor("pointer")
  })

  // onHoverEnd() comes from area() component
  // it runs once when the object stopped being hovered
  btn.onHoverEnd(() => {
    btn.scale = vec2(1)
    btn.color = rgb()
  })

  // onClick() comes from area() component
  // it runs once when the object is clicked
  btn.onClick(f)

  return btn

}

//go("fight")
scene('home', () => {
  add([
    sprite("login_bg"),
    scale(1.4),
    z(-2),

  ])
  function addButton(txt, p, f) {
   
    // add a parent background object
    const btn = add([
      rect(240, 80, { radius: 8 }),
      pos(p),
      area(),
      scale(1),
      anchor("center"),
      outline(4),
    ])

    // add a child object that displays the text
    btn.add([
      text(txt),
      anchor("center"),
      color(0, 0, 0),
    ])

    // onHoverUpdate() comes from area() component
    // it runs every frame when the object is being hovered
    btn.onHoverUpdate(() => {
      const t = time() * 10
      btn.color = hsl2rgb((t / 10) % 1, 0.6, 0.7)
      btn.scale = vec2(1.2)
      setCursor("pointer")
    })

    // onHoverEnd() comes from area() component
    // it runs once when the object stopped being hovered
    btn.onHoverEnd(() => {
      btn.scale = vec2(1)
      btn.color = rgb()
    })

    // onClick() comes from area() component
    // it runs once when the object is clicked
    btn.onClick(f)

    return btn

  }
  addButton("Start", vec2(centerX, centerY), () => {
    platformer()
  })
  addButton("multiplayer", vec2(centerX, centerY + 100), () => {
    scene("room", scene_joinRoom)
    go("room")
    
  })
  addButton("credits", vec2(centerX, centerY + 200), () => {
    go("fight")
  })
})

scene("login", scene_login)
//scene("joinRoom", scene_joinRoom)
go("login")


