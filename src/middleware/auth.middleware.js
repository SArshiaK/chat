const jwt = require('jsonwebtoken');
const User = require('../models/user')
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const requireAuth = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        console.log('token does not exist');
        return res.status(400).send({ success: false, message: 'token does not exist' });
    }

    jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {

        if (err) {
            console.log(err.message);
            return res.status(400).send({ success: false, message: err.message });
        }

        const user = await User.findOne({_id: decodedToken['id']});
        if(!user){
            return res.status(400).send({ success: false, message: "User not found" });
        }
        if(!user.active){
            return res.status(400).send({ success: false, message: "User is blocked" });
        }

        req.User = user;
        next();

    });

};


module.exports = {
    requireAuth,
}
