const UserModel = require("../models/UserModel")
const RoleModel = require("../models/RoleModel.js")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const saltRounds = 10

class AuthService {
    async signUp({ username, email, password, picture }) {
        if (!username || !email || !password || !picture) throw new Error("Missing username, email or password")

        const checkUser = await UserModel.findOne({ username })
        if (checkUser) throw Error("User already exist")
        const checkEmail = await UserModel.findOne({ email })
        if (checkEmail) throw Error("Email already exist")
        const salt = await bcrypt.genSalt(saltRounds)
        const hash = await bcrypt.hash(password, salt)

        const roles = await RoleModel.find({ name: "ROLE_USER" })

        await UserModel.create({ username, email, password: hash, roles: roles[0]._id, picture })

        //populate roles
        const user = await UserModel.findOne({ username }).populate("roles")

        return user._doc
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
        return user._doc
    }

    async logOut(sessionID) {
        const mongoSession = await mongoose.connection.db.collection("sessions").deleteOne({ _id: sessionID })
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
