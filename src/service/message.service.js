const Message = require('../models/message');
const User = require('../models/user');

async function createMessage(senderId, receiverId, data){
    const sender = await User.findOne({_id: senderId});
    const receiver = await User.findOne({_id: receiverId});
    data.sender = sender;
    data.receiver = receiver;
    return await Message.create(data);
}

module.exports = {
    createMessage,
}
