const UserModel = require("../models/UserModel.js")
const RoleModel = require("../models/RoleModel.js")

const allowedFlags = ["admin", "user", "moderator", "all"]

const getRoles = async () => await RoleModel.find({}).then((roles) => roles.map((role) => role.name))

const flagValidation = async (flag) => {
    if (!allowedFlags.includes(flag)) {
        throw new Error("Invalid flag")
    }
    switch (flag) {
        case "admin":
            return await RoleModel.findOne({ name: "ROLE_SUPER_ADMIN" })
        case "user":
            return await RoleModel.findOne({ name: "ROLE_USER" })
        case "moderator":
            return await RoleModel.findOne({ name: "ROLE_MODERATOR" })
        case "all":
            return { name: "all" }
        default:
            return null
    }
}

const verifyAuth = async (role, req) => {
    const roles = await getRoles()
    if (!roles.includes(role)) {
        throw new Error("Invalid role")
    }
    const session = req.session

    if (!session.user)
        throw new Error({
            message: "Session Expired",
            status: 401,
        })

    const user = await UserModel.findById(session.user._id).populate("roles")

    if (!user)
        throw new Error({
            message: "User not found",
            status: 401,
        })

    let ans = false
    user.roles.forEach((element) => element.name === role && (ans = true))
    return ans
}

class AuthMiddleware {
    async signInPermission(req, res, next) {
        try {
            const { username } = req.body

            const flag = await flagValidation(req.params.flag)
            if (!flag) return res.status(400).send("Invalid flag")

            const user = await UserModel.findOne({ username }).populate("roles")
            if (!user) return res.status(400).json({ message: "User not found" })

            const { roles } = user
            if (!roles.length) return res.status(400).json({ message: "User has no roles" })

            if (!roles.find((role) => role.name == flag.name))
                return res.status(401).json({ message: "You are not authorized" })

            next()
        } catch (error) {
            return error.status
                ? res.status(error.status).json({ message: error.message })
                : res.status(400).json({ message: error.message })
        }
    }

    async rememberPermission(req, res, next) {
        try {
            const { username } = req.session.user

            const flag = await flagValidation(req.params.flag)
            if (!flag) return res.status(400).send("Invalid flag")

            const user = await UserModel.findOne({ username }).populate("roles")
            if (!user) return res.status(400).json({ message: "User not found" })

            const { roles } = user

            if (!roles.length) return res.status(400).json({ message: "User has no roles" })

            if (!roles.find((role) => role.name === flag.name))
                return res.status(401).json({ message: "You are not authorized" })

            next()
        } catch (error) {
            return error.status
                ? res.status(error.status).json({ message: error.message })
                : res.status(400).json({ message: error.message })
        }
    }

    //TODO rewrite this functions to one reusable function

    async isAdmin(req, res, next) {
        try {
            const allow = await verifyAuth("ROLE_SUPER_ADMIN", req)
            if (!allow) return res.status(401).json({ message: "You are not authorized" })
            next()
        } catch (error) {
            return error.status
                ? res.status(error.status).json({ message: error.message })
                : res.status(400).json({ message: error.message })
        }
    }

    async isModerator(req, res, next) {
        try {
            const allow = await verifyAuth("ROLE_MODERATOR", req)
            if (!allow) return res.status(401).json({ message: "You are not authorized" })
            next()
        } catch (error) {
            return error.status
                ? res.status(error.status).json({ message: error.message })
                : res.status(400).json({ message: error.message })
        }
    }
    async isUser(req, res, next) {
        try {
            const allow = await verifyAuth("ROLE_USER", req)
            if (!allow) return res.status(401).json({ message: "You are not authorized" })
            next()
        } catch (error) {
            return error.status
                ? res.status(error.status).json({ message: error.message })
                : res.status(400).json({ message: error.message })
        }
    }
}

module.exports = new AuthMiddleware()
