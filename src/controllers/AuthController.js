const AuthService = require("../services/AuthService.js")

class AuthController {
    async signUp(req, res) {
        try {
            const { password, ...others } = await AuthService.signUp(req.body)
            return res.status(200).send(others)
        } catch (error) {
            error.status
                ? res.status(error.status).json({ message: error.message })
                : res.status(400).json({ message: error.message })
        }
    }
    async signIn(req, res) {
        try {
            const { password, ...others } = await AuthService.signIn(req.body)
            const { _id, username, email, roles } = others

            req.session.user = { _id, username, email, roles }

            return res.status(200).send(others)
        } catch (error) {
            error.status
                ? res.status(error.status).json({ message: error.message })
                : res.status(400).json({ message: error.message })
        }
    }

    async logOut(req, res) {
        try {
            req.session.destroy()
            res.clearCookie("session")
            res.status(200).json({
                message: "Logout successfully",
            })
        } catch (error) {
            error.status
                ? res.status(error.status).json({ message: error.message })
                : res.status(400).json({ message: error })
        }
    }

    async remember(req, res) {
        try {
            const { password, ...others } = await AuthService.remember(req.session.user)

            return res.status(200).send(others)
        } catch (error) {
            error.status
                ? res.status(error.status).json({ message: error.message })
                : res.status(400).json({ message: error })
        }
    }
}

module.exports = new AuthController()
