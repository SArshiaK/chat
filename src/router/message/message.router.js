const express = require('express');
const messageRouter = express.Router();
const messageController= require('../../controller/message.controller');

const {requireAuth} = require('../../middleware/auth.middleware')

messageRouter.post('/:id', messageController.httpCreateMessage);
messageRouter.get('/:id', messageController.httpMessagesHistory);


module.exports = messageRouter;
