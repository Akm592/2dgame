
import loadAssets from "./assets"
import makePlayer from "./players"
import scene_joinRoom from "./joinRoom"

//import { db } from "@replit/database";//
export default function scene_login() {


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
  let username = '';

  add([
    text('Enter username:'),
    pos(width() / 2, height() / 2 - 50),
    anchor('center'),
  ]);

  const input = add([
    text(''),
    pos(width() / 2, height() / 2),
    scale(2),
    anchor('center'),
    color(0, 0, 0),
  ]);

  onKeyPress((key) => {
    if (key === 'backspace' && username.length > 0) {
      username = username.slice(0, -1);
      input.text = username;
    } else if (key.length === 1 && username.length < 10) {
      username += key;
      input.text = username;
    }
  });

  addButton('Joingame', vec2(width() / 2, height() / 2 + 100), () => {
    if (username.length > 0) {
      // Store the username in the database
    
console.log(`${username} has joined the game!`);
      go("home")
      //
    }
  });

}
