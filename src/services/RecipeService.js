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
        const validFlags = ["ingredient", "tag", "category"]
        if (!validFlags.includes(flag)) throw new Error("Invalid flag")
        const connection = getConnection()
        if (flag == "ingredient") {
            const { value, lang } = body.ingredient[0]

            if (!value) throw new Error("Ingredient value is required")
            if (!lang) throw new Error("Language is required")
            const langsToTranslate = langs.filter((e) => e != lang)

            const createdIngredient = await Promise.all(
                langsToTranslate.map(async (e) => await translate({ from: lang, to: e, value }))
            )
                .then((translated) => {
                    let ingredient = [{ value, lang }]
                    translated.forEach((e) => {
                        ingredient.push(e)
                    })
                    return ingredient
                })
                .catch((error) => {
                    throw new Error(error)
                })

            const newIngredient = await connection.model("Ingredient", IngredientModel.schema).create(createdIngredient)
            return newIngredient
        } else if (flag == "tag") {
            const { value, lang } = body.tag[0]

            if (!value) throw new Error("Tag value is required")
            if (!lang) throw new Error("Language is required")
            const langsToTranslate = langs.filter((e) => e != lang)

            const createdTag = await Promise.all(
                langsToTranslate.map(async (e) => await translate({ from: lang, to: e, value }))
            )
                .then((translated) => {
                    let tag = [{ value, lang }]
                    translated.forEach((e) => {
                        tag.push(e)
                    })
                    return tag
                })
                .catch((error) => {
                    throw new Error(error)
                })
            const newTag = await connection.model("Tag", TagModel.schema).create(createdTag)
            return newTag
        } else if (flag == "category") {
            const { value, lang } = body.category[0]

            if (!value) throw new Error("Category value is required")
            if (!lang) throw new Error("Language is required")
            const langsToTranslate = langs.filter((e) => e != lang)

            const createdCategory = await Promise.all(
                langsToTranslate.map(async (e) => await translate({ from: lang, to: e, value }))
            )
                .then((translated) => {
                    let category = [{ value, lang }]
                    translated.forEach((e) => {
                        category.push(e)
                    })
                    return category
                })
                .catch((error) => {
                    throw new Error(error)
                })
            const newCategory = await connection.model("Category", CategoryModel.schema).create(createdCategory)
            return newCategory
        } else {
            throw new Error("Something went wrong")
        }
    }
}

module.exports = new RecipeService()
