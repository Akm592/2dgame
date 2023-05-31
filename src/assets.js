export default function loadAssets() {
  loadSprite("bg43", "sprites/bg43.png")
  loadSprite("bg1", "sprites/bg1.png")
  loadSprite("bean", "sprites/bean.png")
  loadSprite("background1", "sprites/background1.png");
  loadSprite("login_bg", "sprites/login_bg.png");
  loadSprite("background3", "sprites/background3.png");
  loadSprite("background2", "sprites/background2.png");
  loadSprite("play", "sprites/play.png");
  loadSprite("background", "assets/background/background_layer_1.png")
  loadSprite("trees", "assets/background/background_layer_2.png")
  loadSpriteAtlas("assets/oak_woods_tileset.png", {
    "ground-golden": {
      "x": 16,
      "y": 0,
      "width": 16,
      "height": 16,
    },
    "deep-ground": {
      "x": 16,
      "y": 32,
      "width": 16,
      "height": 16
    },
    "ground-silver": {
      "x": 150,
      "y": 0,
      "width": 16,
      "height": 16,
    },
    "cliff-left": {
      "x": 112,
      "y": 0,
      "width": 16,
      "height": 16

    },
    "cliff-right": {
      "x": 208,
      "y": 0,
      "width": 16,
      "height": 16
    },
    "cliff-box":
    {
      "x": 128,
      "y": 0,
      "width": 16,
      "height": 16,
    },
  })


  loadSprite("shop", "assets/decorations/shop_anim.png", {
    sliceX: 6,
    sliceY: 1,
    anims: {
      "default": {
        from: 0,
        to: 5,
        speed: 12,
        loop: true
      }
    }
  })
  loadSprite("fence", "assets/decorations/fence_1.png")
  loadSprite("sign", "assets/decorations/sign.png")
  loadSprite("idle-player1", "assets/Idle.png", {
    sliceX: 8,
    sliceY: 1,
    anims: {
      "idle": {
        from: 0,
        to: 7,
        speed: 10,
        loop: true,
      }
    }
  })
  loadSprite("run-player1", "assets/Run.png", {
    sliceX: 8,
    sliceY: 1,
    anims: {
      "run": {
        from: 0,
        to: 7,
        speed: 10,
        loop: true,
      }
    }
  })
  loadSprite("jump-player1", "assets/Jump.png", {
    sliceX: 2,
    sliceY: 1,
    anims: {
      "jump": {
        from: 0,
        to: 1,
        speed: 10,
        loop: true,
      }
    }
  })
  loadSprite("attack-player1", "assets/Attack1.png", {
    sliceX: 6,
    sliceY: 1,
    anims: {
      "attack": {
        from: 0,
        to: 5,

        loop: true,
      }
    }
  })
  loadSprite("death-player1", "assets/Death.png", {
    sliceX: 7,
    sliceY: 1,
    anims: {
      "death": {
        from: 0,
        to: 6,
        speed: 10,

      }
    }
  })


  loadSprite("idle-player2", "assets/Sprites/Idle.png", {
    sliceX: 4, sliceY: 1, anims: { "idle": { from: 0, to: 3, speed: 8, loop: true } }
  })
  loadSprite("jump-player2", "assets/Sprites/Jump.png", {
    sliceX: 2, sliceY: 1, anims: { "jump": { from: 0, to: 1, speed: 2, loop: true } }
  })
  loadSprite("attack-player2", "assets/Sprites/Attack1.png", {
    sliceX: 4, sliceY: 1, anims: { "attack": { from: 0, to: 3, speed: 18 } }
  })
  loadSprite("run-player2", "assets/Sprites/Run.png", {
    sliceX: 8, sliceY: 1, anims: { "run": { from: 0, to: 7, speed: 18 } }
  })
  loadSprite("death-player2", "assets/Sprites/Death.png", {
    sliceX: 7, sliceY: 1, anims: { "death": { from: 0, to: 6, speed: 10 } }
  })
}

