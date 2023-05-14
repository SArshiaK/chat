
const io = require('socket.io');

let Socket;

io("http://localhost:3000", (socket) => {
    Socket = socket;
});

function sendMessage(msg) {
    // console.log(msg);
    Socket.emit("chat message", msg)
}

