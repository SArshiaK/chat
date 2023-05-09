const userService = require('../service/user.service');
const {uploadImage} = require('../utils/utils')
const path = require('path');
const fs = require('fs');
const {userTransform} = require('../transform/user/user.transform');
const {ContactTransform} = require('../transform/contacts/index')

async function httpGetUser(req, res){
    const userId = req.User._id;
    try {
        var user = await userService.getUser(userId);

        user = userTransform(user);
        
        res.response({result: user, statusCode: 200})
    } catch (e) {
        res.exception({statusCode: 400, message: e.message});
        console.log(e);
    }
}



async function httpSignUp(req, res){
    const data = req.body;

    try {
        var {token, user} = await userService.signUp(data);
        user = user.toJSON();
        Object.assign(user, {token: token});
        res.response({
            result: user,
            statusCode: 201,
            message: 'Signed up'
        })
    } catch (e) {
        res.exception({
            statusCode: 400,
            message: e.message
        });
        console.log(e);
    }
}

async function httpLogIn(req, res){
    const data = req.body;
    try {
        var result = await userService.login(data.userName, data.password);
        result = userTransform(result);
        res.response({
            result,
            statusCode: 201,
            message: 'Logged in'
        })
    } catch (e) {
        res.exception({
            statusCode: 400,
            message: e.message
        });
        console.log(e);
    }
}

async function httpUpdateUser(req, res){
    const data = req.body;
    const userId = req.User._id;
    try {
        var result = await userService.updateUser(userId, data);
        result = userTransform(result);
        res.response({result, statusCode: 201, message: "User updated"});
    } catch (e) {
        res.exception({statusCode: 400, message: e.message});
        console.log(e);
    }
}

async function httpDeleteUser(req, res){
    const userId = req.User._id;

    try {
        await userService.deleteUser(userId);
        res.response({statusCode: 201, message: "User deleted"});
    } catch (e) {
        res.exception({statusCode: 400, message: e.message});
        console.log(e);
    }
}

async function httpUploadProfilePicture(req, res){
    const userId = req.User._id;
    const data = req.body;
    try {
        const fileName = await uploadImage(data.format, data.base64Image);
        if(req.User.profilePicture){
            const dirPath = path.join(__dirname, `/../../public/images/${req.User.profilePicture}`);
            console.log(dirPath)
            fs.existsSync(dirPath) && fs.unlinkSync(dirPath);
        }
        await userService.updateUser(userId, {profilePicture: fileName});
        res.response({message: "profile picture uploaded", statusCode: 201});

    } catch (e) {
        res.exception({statusCode: 400, message: e.message});
        console.log(e);
    }
}

async function httpAddContact(req, res){
    const userId = req.User._id;
    const phoneNumber = req.body.phoneNumber;
    try {
        var addedContact = await userService.addContact(userId, phoneNumber);
        addedContact = userTransform(addedContact);
        res.response({result: addedContact, statusCode: 201, message: "contact added"});
    } catch (e) {
        res.exception({statusCode: 400, message: e.message});
        console.log(e);
    }
}

async function httpDeleteContact(req, res){
    const userId = req.User._id;
    const contactId = req.params.id;
    try {
        await userService.deleteContact(userId, contactId);
        res.response({statusCode: 201, message: "contact removed"});
    } catch (e) {
        res.exception({statusCode: 400, message: e.message});
        console.log(e);
    }

}

module.exports = {
    httpGetUser,
    httpSignUp,
    httpLogIn,
    httpUpdateUser,
    httpDeleteUser,
    httpUploadProfilePicture,
    httpAddContact,
    httpDeleteContact,
}