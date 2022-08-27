const UserModel = require("../models/UserModel.js")
const RoleModel = require("../models/RoleModel.js")
const { getConnection } = require("../utils/mongoose.util")
class UsersService {
    async getAllUsers(query) {
        const connection = getConnection()
        const users = await connection
            .model("User", UserModel.schema)
            .find({})
            .skip(query.skip)
            .limit(query.limit)
            .sort(query.sort)
            .populate(query.populate)

        return users
    }

    async getPages(query) {
        const connection = getConnection()
        const pages = await connection.model("User", UserModel.schema).countDocuments()
        return Math.ceil(pages / query.limit)
    }

    async getUser(id, query) {
        const connection = getConnection()
        const user = await connection.model("User", UserModel.schema).findById(id).populate(query.populate)
        const { password, ...others } = user._doc
        return others
    }

    async deleteUser(id) {
        const connection = getConnection()
        const user = await connection.model("User", UserModel.schema).findByIdAndDelete(id)
        return user
    }

    async getRoles() {
        const connection = getConnection()
        const roles = await connection.model("Role", RoleModel.schema).find({})
        return roles
    }
}

module.exports = new UsersService()
