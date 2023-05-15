const {calculateStartDate} = require('../../utils/utils');
const {ContactTransform} = require('../contacts/index')



const userTransform = (data) => {
    const createdAt = calculateStartDate(data.createdAt);
    const updatedAt = calculateStartDate(data.updatedAt);
    return {
        _id: data._id,
        userName: data.userName,
        phoneNumber: data.phoneNumber,
        profileName: data.profileName,
        profilePicture: data.profilePicture,
        biography: data.biography,
        active: data.active,
        contacts: new ContactTransform().transformCollection(data.contacts),
        token: data.token,
        createdAt: createdAt,
        updatedAt: updatedAt
    }
}

module.exports = {
    userTransform,
}
