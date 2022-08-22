const UserModel = require("../models/UserModel.js")
const RoleModel = require("../models/RoleModel.js")
class UsersService {
    async getAllUsers(query) {
        const users = await UserModel.find({})
            .skip(query.skip)
            .limit(query.limit)
            .sort(query.sort)
            .populate(query.populate)

        return users
    }

    async getPages(query) {
        const pages = await UserModel.countDocuments()
        return Math.ceil(pages / query.limit)
    }

    async getUser(id, query) {
        const user = await UserModel.findById(id).populate(query.populate)
        const { password, ...others } = user._doc
        return others
    }

    async deleteUser(id) {
        const user = await UserModel.findByIdAndDelete(id)
        return user
    }

    async getRoles() {
        const roles = await RoleModel.find({})
        return roles
    }
}

module.exports = new UsersService()
