import loadAssets from "./assets";

function makePlayer(posX, posY, width, height, scaleFactor, id) {
    const player = add([
      pos(posX, posY),
      scale(scaleFactor),
      area({ shape: new Rect(vec2(0), width, height) }),
      anchor("center"),
      body({ stickToPlatform: true }),
      {
        id: id,
        isCurrentlyJumping: false,
        health: 500,
        
        username: '',
        sprites: {
          run: "run-" + id,
          idle: "idle-" + id,
          jump: "jump-" + id,
          attack: "attack-" + id,
          death: "death-" + id
        }
      }
    ]);
    setGravity(1200);

    // emit player position to server
    player.onUpdate(() => {
      const { x, y } = player.pos;
     // conn.emit("playerMoved", id, x, y);
      const nameTag = add([
        text(player.username),
        pos(0, -50),
        anchor("center"),
        color(1, 1, 1),

      ]);
      player.nameTag = nameTag;

      // emit player animation to server
      player.on("playAnim", (anim) => {
        //conn.emit("playerAnimChanged", id, anim);
      })
    })

    return player;
  }

  module.exports = makePlayer;