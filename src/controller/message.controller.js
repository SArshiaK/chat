const messageService = require('../service/message.service');

async function httpCreateMessage(req, res){
    const senderId = req.User.id;
    const receiverId = req.params.id;
    const data = req.body;
    try {
        const message = await messageService.createMessage(senderId, receiverId, data);
        res.response({result: message, statusCode: 201, message: "message sent"});
    } catch (e) {
        console.log(e);
        res.exception({statusCode: 400, message: e.message});
    }
}


module.exports = {
    httpCreateMessage,
}