const RecipeModel = require("../models/RecipeModel")
const IngredientModel = require("../models/IngredientModel")

const getLang = (recipe, lang) => {
    try {
        const { title, description, steps, ingredients, ...other } = recipe._doc
        return {
            title: title.filter((e) => e.lang == lang)[0].value,
            description: description.filter((e) => e.lang == lang)[0].value,
            steps: steps.filter((e) => e.lang == lang)[0].value,
            ingredients: ingredients,
            ...other,
        }
    } catch (error) {
        throw new Error("Language not found")
    }
}

class RecipeService {
    async getRecipes() {
        const recipes = await RecipeModel.find({})
        return recipes
    }

    async getRecipe(id) {
        const recipe = await RecipeModel.findById(id).populate("ingredients")
        return getLang(recipe, "en")
    }

    async createRecipe(recipe) {
        //checl if ingredients are valid
        const ingredientsIds = recipe.ingredients.map((ingredient) => ingredient._id)
        const ingredients = await IngredientModel.find({ _id: { $in: ingredientsIds } })
        if (ingredients.length != ingredientsIds.length) {
            throw new Error("Invalid ingredients")
        }

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
