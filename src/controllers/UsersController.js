const UsersService = require("../services/UsersService.js")
const queryUtil = require("../utils/query.util.js")

class UsersController {
    async getAllUsers(req, res) {
        try {
            const type = req.params.type
            const users = await UsersService.getAllUsers(queryUtil(req.query), type)

            for (let i = 0; i < users.length; i++) {
                const { _id, username, picture, email, roles } = users[i]
                users[i] = { _id, username, picture, email, roles }
            }
            return res.status(200).json(users)
        } catch (err) {
            return res.status(500).send(err)
        }
    }
    async getUser(req, res) {
        try {
            const user = await UsersService.getUser(req.params.id, queryUtil(req.query))
            return res.status(200).json(user)
        } catch (err) {
            return res.status(500).send(err)
        }
    }

    async getPages(req, res) {
        try {
            const pages = await UsersService.getPages(queryUtil(req.query))
            return res.status(200).json(pages)
        } catch (err) {
            return res.status(500).send(err)
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await UsersService.deleteUser(req.params.id)
            return res.status(200).json(user)
        } catch (err) {
            return res.status(500).send(err)
        }
    }

    async deleteMultipleUsers(req, res) {
        try {
            const users = await UsersService.deleteMultipleUsers(req.body.ids)
            return res.status(200).json(users)
        } catch (err) {
            return res.status(500).send(err)
        }
    }

    async getRoles(req, res) {
        try {
            const roles = await UsersService.getRoles()
            return res.status(200).json(roles)
        } catch (err) {
            return res.status(500).send(err)
        }
    }

    async updateUser(req, res) {
        try {
            const user = await UsersService.updateUser(req.params.id, req.body)
            console.log(user)
            return res.status(200).json(user)
        } catch (err) {
            return res.status(500).send(err)
        }
    }

    async getByName(req, res) {
        try {
            const users = await UsersService.getByName(req.params.name)
            return res.status(200).json(users)
        } catch (err) {
            return res.status(500).send(err)
        }
    }
}

module.exports = new UsersController()
