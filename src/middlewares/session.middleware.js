const RoleModel = require("../models/RoleModel.js")

class SessionMiddleware {
    async verifySession(req, res, next) {
        const session = req.session

        if (!session.user) return res.status(401).json({ status: 401, message: "Session Expired" })

        const { roles, ...user } = session.user
        user.roles = []

        for (const element of roles) {
            const role = await RoleModel.findById(element._id)
            user.roles.push(role)
        }
        req.body = user
        next()
    }
}

module.exports = new SessionMiddleware()
