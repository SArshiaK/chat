const userService = require('./user.service');

async function contacts(req, res){
    const userId = req.params.id;
    const contacts = await userService.getContacts(userId);
    res.render('users', {
      users: contacts
    })
  }

module.exports = {
    contacts,
}