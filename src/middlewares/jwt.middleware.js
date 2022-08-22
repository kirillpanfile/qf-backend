const Jwt = require("jsonwebtoken")
const User = require("../models/UserModel.js")
const Role = require("../models/RoleModel.js")
const { jwtSecret } = require("../configs/config.js")

const checkAdmin = (user) =>
    Object.values(user.roles)
        .map((role) => role.name)
        .includes("ROLE_SUPER_ADMIN")

class jwtMiddleware {
    async verifyToken(req, res, next) {
        const token = req.headers["x-access-token"]

        if (!token) return res.status(401).send("Access denied. No token provided.")

        try {
            const decoded = Jwt.verify(token, jwtSecret)
            const user = await User.findById(decoded.user._id)
            if (!user) return res.status(404).send("User not found.")
            next()
        } catch (error) {
            return res.status(500).send("Error while decoding token.")
        }
    }
    async verifyAdmin(req, res, next) {
        const token = req.headers["x-access-token"]
        if (!token) return res.status(401).send("Access denied. No token provided.")

        try {
            const decoded = Jwt.verify(token, jwtSecret)
            const user = await User.findById(decoded.user._id).populate("roles")
            if (!user) return res.status(404).send("User not found.")
            if (checkAdmin(user)) next()
            else return res.status(401).json({ msg: "You are not authorized" })
        } catch (error) {
            return res.status(500).send("Error while decoding token.")
        }
    }
}

module.exports = new jwtMiddleware()
