const RoleModel = require("../models/RoleModel.js")

class SessionMiddleware {
    async verifySession(req, res, next) {
        const session = req.session

        if (!session.user) return res.status(401).json({ status: 401, message: "Session Expired" })
        next()
    }
}

module.exports = new SessionMiddleware()
