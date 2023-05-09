const User = require("../models/user");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();
const maxAge = 5 * 24 * 60 * 60;

const JWT_SECRET = process.env.JWT_SECRET

function createToken(userName, id) {
    return jwt.sign({ userName, id }, JWT_SECRET, {
        expiresIn: maxAge,
    })
}

async function getUser(_id){
    return await User.findOne({_id})
    .populate({path:'contacts',model:User})
};

async function signUp(data) {
    const salt = await bcrypt.genSalt();
    if (!data.password) throw new Error("Password Required");
    const password = await bcrypt.hash(data.password, salt);
    data.password = password
    const user = await User.create(data);

    const token = createToken(data.userName, user._id);

    return { token, user };

    
}

async function comparePassword(plaintextPassword, hash) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}

async function login(userName, password) {
    const user = await User.findOne({ userName });

    if (user) {
        const result = await comparePassword(password, user.password);
        if (result) {
            const token = createToken(userName, user.id);
            const data = user.toJSON();
            Object.assign(data, { token: token });

            return data;
        }
        throw new Error('Password is wrong');
    }
    throw new Error('Username not found');
}

async function updateUser(_id, data){
    const updatedUser = await User.updateOne({_id}, data);
}

async function deleteUser(_id){
    await User.deleteOne({_id});
}

async function addContact(_id, phoneNumber){
    var contact = await User.findOne({phoneNumber});
    await User.updateOne(
        { _id}, 
        { $addToSet: { contacts: contact } },
    );
    contact = contact.toJSON();
    return contact;
}

async function deleteContact(_id, contactId){
    await User.updateOne(
        {_id},
        {$pullAll: {
            contacts: [{_id: contactId}],
        },}
    )
}

module.exports = {
    getUser,
    signUp,
    login,
    updateUser,
    deleteUser,
    addContact,
    deleteContact
}