const RecipeModel = require("../models/RecipeModel")
const UserModel = require("../models/UserModel")
const TagModel = require("../models/TagModel")
const CategoryModel = require("../models/CategoryModel")
const IngredientModel = require("../models/IngredientModel")
const { langs } = require("../utils/langs.util")
const translate = require("../utils/translate.util")
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
        const recipes = await RecipeModel.find().populate("ingredients")
        return recipes.map((recipe) => getLang(recipe, lang))
    }

    async getRecipe(id) {
        const recipe = await RecipeModel.findById(id).populate("ingredients")
        return getLang(recipe, "en")
    }

    async createRecipe(recipe) {
        const { author, ingredients, tags, categories } = recipe

        const user = await UserModel.findById(author)
        const checkIngredients = await IngredientModel.find({ _id: { $in: ingredients } })
        const checkTags = await TagModel.find({ _id: { $in: tags } })
        const checkCategories = await CategoryModel.find({ _id: { $in: categories } })

        if (checkIngredients.length != ingredients.length) throw new Error("Ingredients not found")
        if (checkTags.length != tags.length) throw new Error("Tags not found")
        if (checkCategories.length != categories.length) throw new Error("Categories not found")
        if (!user) throw new Error("User not found")

        const newRecipe = new RecipeModel(recipe)
        const savedRecipe = await newRecipe.save()
        return savedRecipe
    }

    async createIngredient(body, flag) {
        const validFlags = ["ingredient", "tag", "category"]
        if (!validFlags.includes(flag)) throw new Error("Invalid flag")

        if (flag == "ingredient") {
            const { value, lang } = body.ingredient[0]

            if (!value) throw new Error("Ingredient value is required")
            if (!lang) throw new Error("Language is required")

            const en = await translate({ value, lang: "en" })
            const ro = await translate({ value, lang: "ro" })
            const ru = await translate({ value, lang: "ru" })

            const newIngredient = new IngredientModel({
                ingredient: [
                    { lang: "en", value: en },
                    { lang: "ro", value: ro },
                    { lang: "ru", value: ru },
                ],
            })

            const savedIngredient = await newIngredient.save()
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
