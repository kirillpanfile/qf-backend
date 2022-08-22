const UserModel = require("../models/UserModel.js")
const RoleModel = require("../models/RoleModel.js")
const bcrypt = require("bcrypt")
const { jwtSecret } = require("../configs/config.js")
const jwt = require("jsonwebtoken")

const saltRounds = 10

class AuthService {
    async signUp({ username, email, password }) {
        if (!username || !email || !password) {
            throw new Error({
                status: 400,
                message: "Missing username, email or password",
            })
        }

        const checkUser = await UserModel.findOne({ username })
        if (checkUser) throw new Error("User already exist")
        const checkEmail = await UserModel.findOne({ email })
        if (checkEmail) throw new Error("Email already exist")

        const salt = await bcrypt.genSalt(saltRounds)
        const hash = await bcrypt.hash(password, salt)

        const roles = await RoleModel.findOne({ name: "ROLE_USER" })

        const newUser = new UserModel({
            username,
            email,
            password: hash,
            roles: [roles._id],
        })

        const createdUser = await newUser.save()
        return createdUser
    }

    async signIn({ username, password }) {
        const user = await UserModel.findOne({ username })
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
        const mongoSession = await mongoose.connection.db.collection("userSessions").deleteOne({ _id: sessionID })

        return mongoSession
    }

    async remember({ username }) {
        const user = await UserModel.findOne({ username })
        if (!user)
            throw new Error({
                status: 401,
                message: "User not found",
            })
        return user._doc
    }
}

module.exports = new AuthService()
