export default function platformer_2() {
    scene("platformer_2", () => {
  const screenSize = vec2(width(), height());
      const groundTiles = addLevel([
        "                   (___) ",
        " (___)                 ",
        "            (___)        ",
  
        "                    (___)",
        "",
        "    (___)              ",
        "                      (___)  ",
        "",
        "  __                   ",
  
        "-------####-----###------",
        "ddddddddddddddddddddddddd",
        "ddddddddddddddddddddddddd",
        "ddddddddddddddddddddddddd",
        
  
  
  
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
          "_": () => [
            sprite("cliff-box"),
            area(),
            body({ isStatic: true }),
          ],
          "(": () => [
            sprite("cliff-left"),
            area(),
            body({ isStatic: true }),
          ],
          ")": () => [
            sprite("cliff-right"),
            area(),
            body({ isStatic: true }),
          ],
        }
      })
      groundTiles.use(scale(4))
  
      const background = add([
        sprite("bg43"),
        z(-2),
        scale(2),
  
      ])
    
      let survivalTime = 0;
      const ui = add([
        //text("Score: 0"),
  
        z(4),
      ])
      
      function makePlayer(posX, posY, width, height, scaleFactor, id) {
        return add([
          pos(posX, posY),
          scale(scaleFactor),
          area({ shape: new Rect(vec2(0), width, height) }),
          anchor("center"),
          body({ stickToPlatform: true }),
          {
            isCurrentlyJumping: false,
            health: 500,
            sprites: {
              run: "run-" + id,
              idle: "idle-" + id,
              jump: "jump-" + id,
              attack: "attack-" + id,
              death: "death-" + id
            }
          }
        ])
      }
      setGravity(1000)
      const FALL_DEATH = 2000
      const JUMP_FORCE = 500
      const player1 = makePlayer(1000, 200, 20, 35, 2, "player1")
      player1.use(sprite(player1.sprites.idle))
      player1.play("idle")
      function run(player, speed, flipPlayer) {
        if (player.health === 0) {
          return
        }
  
        if (player.curAnim() !== "run"
          && !player.isCurrentlyJumping) {
          player.use(sprite(player.sprites.run))
          player.play("run")
        }
        player.move(speed, 0)
        player.flipX = flipPlayer
      }
  
      function resetPlayerToIdle(player) {
        player.use(sprite(player.sprites.idle))
        player.play("idle")
      }
  
      onKeyDown("d", () => {
        run(player1, 500, false)
      })
      onKeyRelease("d", () => {
        if (player1.health !== 0) {
          resetPlayerToIdle(player1)
          player1.flipX = false
        }
      })
  
      onKeyDown("a", () => {
        run(player1, -500, true)
      })
     
      onKeyRelease("a", () => {
        if (player1.health !== 0) {
          resetPlayerToIdle(player1)
          player1.flipX = true
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
        }
      }
  
      function resetAfterJump(player) {
        if (player.isGrounded() && player.isCurrentlyJumping) {
          player.isCurrentlyJumping = false
          if (player.curAnim() !== "idle") {
            resetPlayerToIdle(player)
          }
        }
      }
  
      onKeyDown("w", () => {
        makeJump(player1)
      })
  
      player1.onUpdate(() => resetAfterJump(player1))
  
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
            player.id + "attackHitbox"
          ])
  
          player.play("attack", {
            onEnd: () => {
              resetPlayerToIdle(player)
              player.flipX = currentFlip
            }
          })
        }
      }
  
      onKeyPress("space", () => {
        attack(player1, ["a", "d", "w"])
      })
  
      onKeyRelease("space", () => {
        destroyAll(player1.id + "attackHitbox")
      })
  
     
      const ENEMY_SPEED = 500
      const BULLET_SPEED = 800
  function makeEnemy(x1,y1,t){
    const enemy = add([
      sprite("bean"),
      pos(x1, y1),
      anchor("center"),
      area(),
      body(),
      
      // This enemy cycle between 3 states, and start from "idle" state
      state("move", [ "idle", "attack", "move" ]),
    ])
    
    // Run the callback once every time we enter "idle" state.
    // Here we stay "idle" for 0.5 second, then enter "attack" state.
    enemy.onStateEnter("idle", async () => {
      await wait(0.5)
      enemy.enterState("attack")
    })
    
    // When we enter "attack" state, we fire a bullet, and enter "move" state after 1 sec
    enemy.onStateEnter("attack", async () => {
    
      // Don't do anything if player doesn't exist anymore
      if (player1.exists()) {
    
        const dir = player1.pos.sub(enemy.pos).unit()
    
        add([
          pos(enemy.pos),
          move(dir, BULLET_SPEED),
          rect(12, 12),
          area(),
          offscreen({ destroy: true }),
          anchor("center"),
          color(BLUE),
          "bullet",
        ])
    
      }
    
      await wait(1)
      enemy.enterState("move")
    
    })
    
    enemy.onStateEnter("move", async () => {
      await wait(t)
      enemy.enterState("idle")
    })
    
    // Like .onUpdate() which runs every frame, but only runs when the current state is "move"
    // Here we move towards the player every frame if the current state is "move"
    enemy.onStateUpdate("move", () => {
      if (!player1.exists()) return
      const dir = player1.pos.sub(enemy.pos).unit()
      enemy.move(dir.scale(ENEMY_SPEED))
    })
    
    // Taking a bullet makes us disappear
    player1.onCollide("bullet", (bullet) => {
      destroy(bullet)
      destroy(player1)
      addKaboom(bullet.pos)
      go("loose")
    })
  
  }
  
  makeEnemy(350,350,1)
    makeEnemy(700,700,2)
      //camera 
      console.log(time())
      camScale(1)
      player1.onUpdate(() => {
        //camPos(player1.pos)
        if(player1.pos.y > 2000){
          go("loose", { score: survivalTime });
        }
        survivalTime += dt();
        scoreLabel.text = "Score: " + Math.floor(survivalTime * 100);
        if(Math.floor(survivalTime * 100)>500){
            go("win", { score: survivalTime });

        }
        
      })
      
      onKeyDown("enter", () => {
        wait(1, () => {
          go("home")
      })
    })
    const scoreLabel = ui.add([
      text("Score: 0"),
      pos(),
      "score"
      
    ]);
  
    makeEnemy()
    makeEnemy(500,500,2)
    makeEnemy(1000,1000,1)

    })
  
    scene("loose", () => {
      add([
        sprite("login_bg"),
        scale(1.4),
        z(-2),
    
      ])
      const score = get("score");
      add([
        text(`Score: ${score}`),
        anchor("center"),
        pos(width() / 2, height() / 2 - 200),
        scale(3),
        color(1, 0, 0),
      ]);
      add([
        text("You lost!"),
        anchor("center"),
        pos(width() / 2, height() / 2 - 100),
        scale(3),
        color(1, 0, 0),
      ]);
    
      
    
      const restartBtn = add([
        rect(240, 80, { radius: 8 }),
        pos(width() / 2, height() / 2 + 100),
        anchor("center"),
        color(255, 255, 255),
        outline(4),
        area(),
      ]);
    
      restartBtn.add([
        text("Restart"),
        anchor("center"),
        color(0, 0, 0),
      ]);
    
      restartBtn.onClick(() => {
        go("home")
      });
    });
    scene("win", () => {
        add([
          sprite("login_bg"),
          scale(1.4),
          z(-2),
      
        ])
        const score = get("score");
        add([
          text(`Score: ${score}`),
          anchor("center"),
          pos(width() / 2, height() / 2 - 200),
          scale(3),
          color(1, 0, 0),
        ]);
        add([
          text("You WIN!"),
          anchor("center"),
          pos(width() / 2, height() / 2 - 100),
          scale(3),
          color(1, 0, 0),
        ]);
      
        
      
        const restartBtn = add([
          rect(240, 80, { radius: 8 }),
          pos(width() / 2, height() / 2 + 100),
          anchor("center"),
          color(255, 255, 255),
          outline(4),
          area(),
        ]);
      
        restartBtn.add([
          text("Restart"),
          anchor("center"),
          color(0, 0, 0),
        ]);
      
        restartBtn.onClick(() => {
          go("home")
        });
      });
  
    go("platformer_2")
  }
  