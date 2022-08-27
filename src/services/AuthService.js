const UserModel = require("../models/UserModel.js")
const RoleModel = require("../models/RoleModel.js")
const bcrypt = require("bcrypt")
const { jwtSecret } = require("../configs/config.js")
const jwt = require("jsonwebtoken")
const { getConnection } = require("../utils/mongoose.util")

const saltRounds = 10

class AuthService {
    async signUp({ username, email, password }) {
        if (!username || !email || !password) {
            throw new Error({
                status: 400,
                message: "Missing username, email or password",
            })
        }
        const connection = getConnection()
        // const checkUser = await UserModel.findOne({ username })
        const checkUser = await connection.model("User").findOne({ username })
        if (checkUser) throw new Error("User already exist")
        const checkEmail = await connection.model("User").findOne({ email })
        if (checkEmail) throw new Error("Email already exist")

        const salt = await bcrypt.genSalt(saltRounds)
        const hash = await bcrypt.hash(password, salt)

        const roles = await connection.model("Role", RoleModel.schema).findOne({ name: "ROLE_USER" })

        const newUser = await connection.model("User", UserModel.schema).create({
            username,
            email,
            password: hash,
            roles: [roles._id],
        })
        return newUser
    }

    async signIn({ username, password }) {
        const connection = getConnection()
        // const user = await UserModel.findOne({ username })
        const user = await connection.model("User", UserModel.schema).findOne({ username })
        if (!user)
            throw new Error({
                status: 401,
                message: "User not found",
            })

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword)
            throw new Error({
                status: 401,
                message: "Password is incorrect",
            })

        user._doc.accessToken = jwt.sign({ user }, jwtSecret)

        return user._doc
    }

    async logOut(sessionID) {
        const connection = getConnection()
        const mongoSession = await connection.model("UserSession").deleteOne({ _id: sessionID })

        return mongoSession
    }

    async remember({ username }) {
        const connection = getConnection()
        const user = await connection.model("User", UserModel.schema).findOne({ username })
        if (!user)
            throw new Error({
                status: 401,
                message: "User not found",
            })
        return user._doc
    }
}

module.exports = new AuthService()
