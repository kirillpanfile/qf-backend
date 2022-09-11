const UserModel = require("../models/UserModel.js")
const RoleModel = require("../models/RoleModel.js")
class UsersService {
    async getAllUsers(query, type) {
        const roles = await RoleModel.find({})
        const validRoles = roles.map((role) => {
            return {
                _id: role._id,
                role: role._doc.name.replace("ROLE_", "").replace("_", "").toLowerCase(),
            }
        })

        if (!validRoles.some((role) => role.role === type)) {
            throw new Error("Invalid type")
        }

        const role = validRoles.find((role) => role.role === type)

        const users = await UserModel.find({ roles: role._id })
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

    async updateUser(id, body) {
        // const { username, email, roles } = await connection
        //     .model("User", UserModel.schema)
        //     .findById(id)
        //     .populate("roles")

        const user = await UserModel.findByIdAndUpdate(id, body).populate("roles")

        return user
    }
}

module.exports = new UsersService()
