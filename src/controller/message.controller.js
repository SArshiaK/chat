const messageService = require('../service/message.service');
const userService = require('../service/user.service');

async function httpCreateMessage(req, res){
    const senderId = req.User.id;
    const receiverId = req.params.id;
    const data = req.body;
    try {
        const message = await messageService.createMessage(senderId, receiverId, data);
        const {socketId} = await userService.getSocketId(receiverId);
        res.response({result: message, statusCode: 201, message: "message sent"});
        global.io.to(socketId).emit("chat message", { text: message.messageText, id: message._id });
    } catch (e) {
        console.log(e);
        res.exception({statusCode: 400, message: e.message});
    }
}


module.exports = {
    httpCreateMessage,
}