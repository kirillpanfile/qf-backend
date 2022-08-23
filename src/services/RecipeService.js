const RecipeModel = require("../models/RecipeModel")
const IngredientModel = require("../models/IngredientModel")
class RecipeService {
    async getRecipes() {
        const recipes = await RecipeModel.find({})
        return recipes
    }

    async getRecipe(id) {
        const recipe = await RecipeModel.findById(id)
        return recipe
    }

    async createRecipe(recipe) {
        const newRecipe = new RecipeModel(recipe)
        const savedRecipe = await newRecipe.save()
        return savedRecipe
    }

    async createIngredient(ingredient) {
        const newIngredient = new IngredientModel(ingredient)
        const savedIngredient = await newIngredient.save()
        return savedIngredient
    }
}

module.exports = new RecipeService()
