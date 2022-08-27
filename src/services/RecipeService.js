const RecipeModel = require("../models/RecipeModel")
const UserModel = require("../models/UserModel")
const TagModel = require("../models/TagModel")
const CategoryModel = require("../models/CategoryModel")
const IngredientModel = require("../models/IngredientModel")
const { langs } = require("../utils/langs.util")
const translate = require("../utils/translate.util")
const { getConnection } = require("../utils/mongoose.util")

//get recipe by current language selected
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
    //Get all recipes
    async getRecipes(lang) {
        const connection = getConnection()
        const recipes = await connection.model("Recipe", RecipeModel.schema).find({}).populate("ingredients")
        return recipes.map((recipe) => getLang(recipe, lang))
    }

    async getRecipe(id) {
        const connection = getConnection()
        const recipe = await connection.model("Recipe", RecipeModel.schema).findById(id).populate("ingredients")
        return getLang(recipe, "en")
    }

    async createRecipe(recipe) {
        const connection = getConnection()
        const { author, ingredients, tags, categories } = recipe

        const user = await connection.model("User", UserModel.schema).findById(author)
        const checkIngredients = await connection
            .model("Ingredient", IngredientModel.schema)
            .find({ _id: { $in: ingredients } })
        const checkTags = await connection.model("Tag", TagModel.schema).find({ _id: { $in: tags } })
        const checkCategories = await connection
            .model("Category", CategoryModel.schema)
            .find({ _id: { $in: categories } })

        if (checkIngredients.length != ingredients.length) throw new Error("Ingredients not found")
        if (checkTags.length != tags.length) throw new Error("Tags not found")
        if (checkCategories.length != categories.length) throw new Error("Categories not found")
        if (!user) throw new Error("User not found")

        const newRecipe = await connection.model("Recipe", RecipeModel.schema)
        const savedRecipe = await newRecipe.create(recipe)
        return savedRecipe
    }

    async createIngredient(body, flag) {
        //log app.locales
        const validFlags = ["ingredient", "tag", "category"]
        if (!validFlags.includes(flag)) throw new Error("Invalid flag")

        if (flag == "ingredient") {
            const { value, lang } = body.ingredient[0]

            if (!value) throw new Error("Ingredient value is required")
            if (!lang) throw new Error("Language is required")
            const langsToTranslate = langs.filter((e) => e != lang)
            const ingredient = [{ value, lang }]

            const connection = getConnection()

            const savedIngredient = await Promise.all(
                langsToTranslate.map(async (e) => await translate({ from: lang, to: e, value }))
            )
                .then((translated) => {
                    translated.forEach((e) => {
                        ingredient.push(e)
                    })
                })
                .then(async () => {
                    const newIngredient = connection.model("Ingredient", IngredientModel.schema)
                    const savedIngredient = await newIngredient.create({
                        ingredient: ingredient,
                    })
                    return savedIngredient
                })
                .catch((error) => {
                    throw new Error(error)
                })

            return savedIngredient
        } else if (flag == "tag") {
            const newTag = new TagModel(body)
            const savedTag = await newTag.save()
            return savedTag
        } else if (flag == "category") {
            const newCategory = new CategoryModel(body)
            const savedCategory = await newCategory.save()
            return savedCategory
        } else {
            throw new Error("Something went wrong")
        }
    }
}

module.exports = new RecipeService()
