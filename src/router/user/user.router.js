const userController = require('../../controller/user.controller');

const express = require('express');

const userRouter = express.Router();

const {requireAuth} = require('../../middleware/auth.middleware');

userRouter.get('/', requireAuth, userController.httpGetUser);
userRouter.post('/signup', userController.httpSignUp);
userRouter.post('/login', userController.httpLogIn);
userRouter.patch('/update', requireAuth, userController.httpUpdateUser);
userRouter.delete('/delete', requireAuth, userController.httpDeleteUser);
userRouter.post('/upload/profile', requireAuth, userController.httpUploadProfilePicture);
userRouter.post('/contact/add', requireAuth, userController.httpAddContact);
userRouter.delete('/contact/delete/:id', requireAuth, userController.httpDeleteContact);



module.exports = userRouter;