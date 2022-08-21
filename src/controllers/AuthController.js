const AuthService = require("../services/AuthService.js");
const mongoose = require("mongoose");

class AuthController {
  async signUp(req, res) {
    try {
      const user = await AuthService.signUp(req.body);
      const { password, ...others } = user;
      return res.status(200).send(others);
    } catch (error) {
      error.status
        ? res.status(error.status).json({ message: error.message })
        : res.status(400).json({ message: error.message });
    }
  }
  async signIn(req, res) {
    try {
      const user = await AuthService.signIn(req.body);
      const { password, ...others } = user;

      req.session.user = {
        userId: user._id,
        userName: user.name,
        userEmail: user.email,
        userRole: user.roles,
      };

      console.log(req.session);
      // const session = mongoose.connection.db.collection("userSession");
      // console.log(await session.findOne({ _id: "" }));

      return res.status(200).send(others);
    } catch (error) {
      error.status
        ? res.status(error.status).json({ message: error.message })
        : res.status(400).json({ message: error.message });
    }
  }

  async signInRemember(req, res) {
    try {
      const user = await AuthService.signInRemember(req.body);
      const { password, ...others } = user;
      return res.status(200).send(others);
    } catch (error) {
      error.status
        ? res.status(error.status).json({ message: error.message })
        : res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();
