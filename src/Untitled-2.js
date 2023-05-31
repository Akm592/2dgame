// store player positions and usernames
let players = {};

// handle new connections
io.on('connection', (socket) => {
console.log(`New connection: ${socket.id}`);

// handle player joining game
socket.on('joinGame', (username) => {
  console.log(`Player ${socket.id} joined game with username ${username}`);
 
  socket.emit('playerData', players);
  socket.broadcast.emit('playerJoined', socket.id, players[socket.id]);
});

// handle player movement
socket.on('playerMoved', (id, x, y) => {
  players[id].x = x;
  players[id].y = y;
  socket.broadcast.emit('playerMoved', id, x, y);
});

// handle player animation changes
socket.on('playerAnimChanged', (id, anim) => {
  players[id].animation = anim;
  socket.broadcast.emit('playerAnimChanged', id, anim);
});

// handle player jumping
socket.on('playerJumped', (id, x, y) => {
  players[id].isCurrentlyJumping = true;
  socket.broadcast.emit('playerJumped', id, x, y);
});

// handle player landing
socket.on('playerLanded', (id, x, y) => {
  players[id].isCurrentlyJumping = false;
  socket.broadcast.emit('playerLanded', id, x, y);
});

// handle player flipping
socket.on('playerFlipped', (id, flipped) => {
  players[id].flipped = flipped;
  socket.broadcast.emit('playerFlipped', id, flipped);
});

// handle player attacks
socket.on('playerAttack', (id) => {
  socket.broadcast.emit('playerAttacked', id);
});

// handle player disconnecting
socket.on('disconnect', () => {
  console.log(`Player ${socket.id} disconnected`);
  delete players[socket.id];
  socket.broadcast.emit('playerDisconnected', socket.id);
});
});