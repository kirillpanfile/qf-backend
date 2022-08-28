const { getConnection } = require("../utils/mongoose.util")
const TaskModel = require("../models/TaskModel")

class TaskService {
    async createTask(task) {
        const connection = getConnection()
        console.log(task)
        const newTask = await connection.model("Task", TaskModel.schema).create(task)
        return newTask
    }

    async getTasks(query) {
        const connection = getConnection()
        const tasks = await connection.model("Task", TaskModel.schema).find({}).populate("ingredients")
        return tasks
    }

    async getTask(id) {
        const connection = getConnection()
        const task = await connection.model("Task", TaskModel.schema).findById(id).populate("ingredients")
        return task
    }
    async updateTask(id, task) {
        const connection = getConnection()
        const updatedTask = await connection.model("Task", TaskModel.schema).findByIdAndUpdate(id, task)
        return updatedTask
    }
    async deleteTask(id) {
        const connection = getConnection()
        const deletedTask = await connection.model("Task", TaskModel.schema).findByIdAndDelete(id)
        return deletedTask
    }
}

module.exports = new TaskService()
