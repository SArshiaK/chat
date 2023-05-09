const mongoPaginate = require('mongoose-paginate-v2');
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
    receiver: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
    seen: {type: Boolean, default: 0},
    messageText: {type: String, trim: true, default: null},
    messageImage: {type: String, trim: true, default: null},
    messageVideo: {type: String, trim: true, default: null},
    messageVoice: {type: String, trim: true, default: null},
}, { timestamps: true })


messageSchema.plugin(mongoPaginate);

module.exports = mongoose.model("message", messageSchema);