const RoleModel = require("../models/RoleModel.js")

class SessionMiddleware {
    async verifySession(req, res, next) {
        const session = req.session

        if (!session.user) {
            res.clearCookie("session")

            req.session.destroy((err) => {
                if (err) {
                    console.log(err)
                }
            })

            return res.status(401).json({ status: 401, message: "Session Expired" })
        } else next()
    }
}

module.exports = new SessionMiddleware()
