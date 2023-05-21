const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();
const apiRouter = require("./src/router");
const path = require("path");
const handleResponse = require("./src/middleware/handleResponse");
const { mongoConnect, mongoDisconnect } = require("./src/db/mongo");
const cors = require("cors");
var cookieParser = require("cookie-parser");

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { updateUser, getSocketId } = require("./src/service/user.service");
const { updateMessage, returnUnseenMessages } = require('./src/service/message.service');

const ejs = require('./src/service/ejs.service');
const {requireAuth} = require('./src/middleware/auth.middleware')

global.io = io;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api", handleResponse, apiRouter);
// app.use("/public", express.static(path.join(__dirname, "./public")));

app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');

app.get('/login', function(req, res){
  res.render('login', {
      message: 'View Engine Demo'
  })
})

app.get('/contacts/:id', ejs.contacts);
app.get('/sendmessage/:id', function(req, res){
  res.render('sendmessage', {})
})
app.get('/main', function(req, res){
  res.render('main', {})
})
app.get('/signup', function(req, res){
  res.render('signup', {})
})


global.io.on("connection", async (socket) => {
  console.log("a user connected", socket.id);
  const senderId = socket.handshake.query.senderId;
  const fromUserId = socket.handshake.query.fromUserId;
  console.log(senderId)

  await updateUser(senderId, { socketId: socket.id });

  await returnUnseenMessages(senderId, fromUserId);
  
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  
  socket.on("chat message", async (data) => {
    console.log("message: " + data.msg);
    const receiverId = data.receiverId;
    const socketId = await getSocketId(receiverId);
    console.log("socketId:" + socketId.socketId);

    global.io.to(socketId.socketId).emit("chat message", {text: data.msg});

  });

  socket.on("seen message", async id => {
      //update seeen message
      console.log(id);
      await updateMessage(id, {seen: true});
  })
});

async function startServer() {
  await mongoConnect();

  server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}🔥`);
  });
}

startServer();
