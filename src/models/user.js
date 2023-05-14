const mongoPaginate = require('mongoose-paginate-v2');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {type: String,trim: true,required: [true, "Username can't be null"],unique: true},
    password: {type: String,required: [true, "Password can't be null"],},
    phoneNumber: {type: String,required: [true, "Phone number can't be null"],unique: true,match: /^[0]?[9][0-9]{9}$/,},
    profileName: {type: String,required: [true, "Profile name can't be null"],},
    profilePicture: {type: String, default: null},
    biography: {type: String, default: null},
    active: { type: Boolean, default: true },
    contacts: [{type: mongoose.Schema.Types.ObjectId, ref: "user"}],
    socketId: { type: String, default: null },

}, { timestamps: true })

userSchema.plugin(mongoPaginate);


module.exports = mongoose.model("user", userSchema);