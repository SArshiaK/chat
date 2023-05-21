const Transform = require('../index');
const {calculateStartDate} = require('../../utils/utils')

class ContactTransform extends Transform {
    transform(data) {
        return {
            _id: data._id,
            phoneNumber: data.phoneNumber,
            profileName: data.profileName,
            profilePicture: data.profilePicture,
            biography: data.biography,
            active: data.active,
            createdAt: calculateStartDate(data.createdAt),
            updatedAt: calculateStartDate(data.updatedAt)
        }
    }

}

module.exports = {
    ContactTransform
}
