const express = require('express');
const messageRouter = express.Router();
const messageController= require('../../controller/message.controller');

const {requireAuth} = require('../../middleware/auth.middleware')

messageRouter.post('/:id', messageController.httpCreateMessage);

module.exports = messageRouter;
