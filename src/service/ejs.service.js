const userService = require('./user.service');
const messageService = require('./message.service')

async function contacts(req, res){
    const userId = req.params.id;
    const contacts = await userService.getContacts(userId);
    res.render('users', {
      users: contacts
    })
  }

function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}


async function history(req, res){
  const cookie = req.headers.cookie;
  const user = parseJwt(cookie);
  const senderId = user.id;
  const receiverId = req.params.id;
  const messages = await messageService.messagesHistory(receiverId, senderId);
    res.render('sendmessage', {
      messages
    })
  }

module.exports = {
    contacts,
    history
}