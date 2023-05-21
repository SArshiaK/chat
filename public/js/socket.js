
const io = require('socket.io');

let Socket;

io("http://localhost:3000", (socket) => {
    Socket = socket;
});

function sendMessage(msg) {
    Socket.emit("chat message", msg)
}

