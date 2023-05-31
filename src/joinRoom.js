
import loadAssets from "./assets"

export default function scene_joinRoom() {
  

  function addButton(txt, p, f) {
    add([
      sprite("login_bg"),
      scale(1.4),
      z(-2),

    ])
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
  const username = localStorage.getItem("username");
  let roomCode = "";

  // display input field and buttons to join or create room
  const input = add([
    text("Enter the room code: "),
    pos(width() / 2 - 100, height() / 2),
    anchor("center"),
    color(0, 0, 0),
  ]);
  const codeInput = add([
    text(""),
    pos(width() / 2 + 50, height() / 2),
    scale(2),
    anchor("center"),
    color(0, 0, 0),
  ]);
  const joinButton = addButton("Join", vec2(width() / 2 - 200, height() / 2 + 100), () => {
    roomCode = codeInput.text;

    go("fight");
  });
  const createButton = addButton("Create", vec2(width() / 2 + 200, height() / 2 + 100), () => {

    go("fight");
  });



  // update room code input field when a key is pressed
  onKeyPress((key) => {
    if (key === 'backspace' && roomCode.length > 0) {
      roomCode = roomCode.slice(0, -1);
      codeInput.text = roomCode;
    } else if (key.length === 1 && roomCode.length < 10) {
      roomCode += key;
      codeInput.text = roomCode;
    }
  });

  // add a button to go back to the home screen
  addButton("Back", vec2(width() / 2, height() / 2 + 300), () => {
    go("home");
  });
}
    