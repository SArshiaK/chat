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

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api", handleResponse, apiRouter);
app.use("/public", express.static(path.join(__dirname, "./public")));


io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  
  socket.on("disconnect", () => {
      console.log("user disconnected");
    });
    socket.on("chat message", async (data) => {
        console.log("message: " + data.msg);
        const senderId = data.senderId;
        const receiverId = data.receiverId;
        await updateUser(senderId, { socketId: socket.id });
        const socketId = await getSocketId(receiverId);
        console.log(socketId)
        io.to(socketId).emit("chat message", data.msg);
  });
});

async function startServer() {
  await mongoConnect();

  server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}🔥`);
  });
}

startServer();
