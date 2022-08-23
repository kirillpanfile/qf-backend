const RecipeService = require("../services/RecipeService")

class RecipeController {
    async getRecipe(req, res) {
        try {
            const id = req.params.id
            const recipe = await RecipeService.getRecipe(id)
            return res.status(200).json(recipe)
        } catch (error) {
            error.status
                ? res.status(error.status).json({ message: error.message })
                : res.status(400).json({ message: error.message })
        }
    }
    async getRecipes(req, res) {
        try {
            const recipes = await RecipeService.getRecipes()
            return res.status(200).json(recipes)
        } catch (error) {
            error.status
                ? res.status(error.status).json({ message: error.message })
                : res.status(400).json({ message: error.message })
        }
    }
    async createRecipe(req, res) {
        try {
            const recipe = await RecipeService.createRecipe(req.body)
            return res.status(200).json(recipe)
        } catch (error) {
            error.status
                ? res.status(error.status).json({ message: error.message })
                : res.status(400).json({ message: error.message })
        }
    }
    async updateRecipe(req, res) {
        try {
            const recipe = await RecipeService.updateRecipe(req.body)
            return res.status(200).json(recipe)
        } catch (error) {
            error.status
                ? res.status(error.status).json({ message: error.message })
                : res.status(400).json({ message: error.message })
        }
    }
    async deleteRecipe(req, res) {
        try {
            const recipe = await RecipeService.deleteRecipe(req.body)
            return res.status(200).json(recipe)
        } catch (error) {
            error.status
                ? res.status(error.status).json({ message: error.message })
                : res.status(400).json({ message: error.message })
        }
    }

    async createIngredient(req, res) {
        try {
            const ingredient = await RecipeService.createIngredient(req.body)
            return res.status(200).json(ingredient)
        } catch (error) {
            error.status
                ? res.status(error.status).json({ message: error.message })
                : res.status(400).json({ message: error.message })
        }
    }
}

module.exports = new RecipeController()
