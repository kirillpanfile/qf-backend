const UsersService = require("../services/UsersService.js");
const queryUtil = require("../utils/query.util.js");

class UsersController {
  async getAllUsers(req, res) {
    try {
      const users = await UsersService.getAllUsers(queryUtil(req.query));
      for (let i = 0; i < users.length; i++) {
        const { _id, username, picture, email, roles } = users[i];
        users[i] = { _id, username, picture, email, roles };
      }
      res.status(200).json(users);
    } catch (err) {
      res.status(500).send(err);
    }
  }
  async getUser(req, res) {
    try {
      const user = await UsersService.getUser(
        req.params.id,
        queryUtil(req.query)
      );
      res.status(200).json(user);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async getPages(req, res) {
    try {
      const pages = await UsersService.getPages(queryUtil(req.query));
      res.status(200).json(pages);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async deleteUser(req, res) {
    try {
      const user = await UsersService.deleteUser(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = new UsersController();
