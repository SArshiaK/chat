const Message = require('../models/message');
const User = require('../models/user');

async function createMessage(senderId, receiverId, data){
    const sender = await User.findOne({_id: senderId});
    const receiver = await User.findOne({_id: receiverId});
    data.sender = sender;
    data.receiver = receiver;
    return await Message.create(data);
}

async function updateMessage(_id, data){
    const updatedMessage = await Message.updateOne({_id}, data);
    return updatedMessage;
}

async function returnUnseenMessages(receiver, sender){
    const messages = await Message.find({receiver, sender, seen: false})
    .select("messageText receiver")
    .populate({path:'receiver',model:User})
    .populate({path:'sender',model:User});
    messages.forEach((message) => {
        var socketId = message.receiver.socketId;
        var text = `${message.sender.userName}: ${message.messageText}`;
        global.io.to(socketId).emit("chat message", { text, id: message._id, senderId: message.sender._id});
    })
}

module.exports = {
    createMessage,
    updateMessage,
    returnUnseenMessages
}
