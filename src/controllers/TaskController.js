const TaskService = require("../services/TaskService")

class TaskController {
    async createTask(req, res) {
        try {
            console.log(req.body)
            const task = await TaskService.createTask(req.body)
            res.status(200).json(task)
        } catch (err) {
            res.status(500).send(err)
        }
    }

    async getTasks(req, res) {
        try {
            const tasks = await TaskService.getTasks(req.query)
            res.status(200).json(tasks)
        } catch (err) {
            res.status(500).send(err)
        }
    }
    async getTask(req, res) {
        try {
            const task = await TaskService.getTask(req.params.id, req.query)
            res.status(200).json(task)
        } catch (err) {
            res.status(500).send(err)
        }
    }
    async updateTask(req, res) {
        try {
            const task = await TaskService.updateTask(req.params.id, req.body)
            res.status(200).json(task)
        } catch (err) {
            res.status(500).send(err)
        }
    }
    async deleteTask(req, res) {
        try {
            const task = await TaskService.deleteTask(req.params.id)
            res.status(200).json(task)
        } catch (err) {
            res.status(500).send(err)
        }
    }
}

module.exports = new TaskController()
