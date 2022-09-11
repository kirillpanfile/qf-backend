const TaskModel = require("../models/TaskModel")

class TaskService {
    async createTask(task) {
        const newTask = await TaskModel.create(task)

        return newTask.populate("user", ["username", "_id", "picture"])
    }

    async getTasks() {
        const tasks = await TaskModel.find({}).populate("user", ["username", "_id", "picture"])
        return tasks
    }

    async getTask(id) {
        const task = await TaskModel.findById(id).populate("ingredients")
        return task
    }
    async updateTask(id, task) {
        const updatedTask = await TaskModel.findByIdAndUpdate(id, task)
        return updatedTask
    }
    async deleteTask(id) {
        const deletedTask = await TaskModel.findByIdAndDelete(id)
        return deletedTask
    }
}

module.exports = new TaskService()
