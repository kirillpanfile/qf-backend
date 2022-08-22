const UserModel = require("../models/UserModel.js");
const RoleModel = require("../models/RoleModel.js");
const allowedFlags = ["admin", "user", "moderator", "all"];

const flagValidation = async (flag) => {
  if (!allowedFlags.includes(flag)) {
    throw new Error("Invalid flag");
  }
  switch (flag) {
    case "admin":
      return await RoleModel.findOne({ name: "ROLE_SUPER_ADMIN" });
    case "user":
      return await RoleModel.findOne({ name: "ROLE_USER" });
    case "moderator":
      return await RoleModel.findOne({ name: "ROLE_MODERATOR" });
    case "all":
      return { name: "all" };
    default:
      return null;
  }
};

class AuthMiddleware {
  async signInPermission(req, res, next) {
    try {
      const { username } = req.body;

      const flag = await flagValidation(req.params.flag);
      if (!flag) return res.status(400).send("Invalid flag");

      const user = await UserModel.findOne({ username }).populate("roles");
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      const { roles } = user;

      if (!roles.length) {
        return res.status(400).json({ message: "User has no roles" });
      }

      if (flag.name == "all") {
        return next();
      }
      if (!roles.find((role) => role.name === flag.name)) {
        return res.status(401).json({ message: "You are not authorized" });
      }
      next();
    } catch (error) {
      error.status
        ? res.status(error.status).json({ message: error.message })
        : res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new AuthMiddleware();
