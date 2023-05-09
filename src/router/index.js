const express = require('express');
const router = express.Router();

const {requireAuth} = require('../middleware/auth.middleware');
const {ValidationError} = require('express-validation');

const userRouter = require('./user/user.router');
const messageRouter = require('./message/message.router');

router.use('/user', userRouter);
router.use('/message', requireAuth, messageRouter);

router.use(function(err, req, res, next) {
    if (err instanceof ValidationError) {
      console.log(err)
      return res.status(err.statusCode).json({success: false, message: 'Failed'});
    }
    console.log(err);
    return res.status(500).json({success: false, message: 'Failed'});
  })
  

module.exports = router;