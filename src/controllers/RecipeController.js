class RecipeController {
    async getRecipe(req, res) {
        try {
            const recipe = await this.recipeService.getRecipe(id)
            return res.status(200).json(recipe)
        } catch (error) {
            error.status
                ? res.status(error.status).json({ message: error.message })
                : res.status(400).json({ message: error.message })
        }
    }
    async getRecipes(req, res) {
        try {
            const recipes = await this.recipeService.getRecipes()
            return res.status(200).json(recipes)
        } catch (error) {
            error.status
                ? res.status(error.status).json({ message: error.message })
                : res.status(400).json({ message: error.message })
        }
    }
    async createRecipe(req, res) {
        try {
            const recipe = await this.recipeService.createRecipe(req.body)
            return res.status(200).json(recipe)
        } catch (error) {
            error.status
                ? res.status(error.status).json({ message: error.message })
                : res.status(400).json({ message: error.message })
        }
    }
    async updateRecipe(req, res) {
        try {
            const recipe = await this.recipeService.updateRecipe(req.body)
            return res.status(200).json(recipe)
        } catch (error) {
            error.status
                ? res.status(error.status).json({ message: error.message })
                : res.status(400).json({ message: error.message })
        }
    }
    async deleteRecipe(req, res) {
        try {
            const recipe = await this.recipeService.deleteRecipe(req.body)
            return res.status(200).json(recipe)
        } catch (error) {
            error.status
                ? res.status(error.status).json({ message: error.message })
                : res.status(400).json({ message: error.message })
        }
    }
}

module.exports = new RecipeController()
