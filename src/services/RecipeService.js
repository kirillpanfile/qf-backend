const RecipeModel = require("../models/RecipeModel")
const UserModel = require("../models/UserModel")
const TagModel = require("../models/TagModel")
const CategoryModel = require("../models/CategoryModel")
const IngredientModel = require("../models/IngredientModel")
const { langs } = require("../utils/langs.util")
const translate = require("../utils/translate.util")
const { getConnection } = require("../utils/mongoose.util")

const langsToTranslate = (lang) => langs.filter((e) => e != lang)

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

        let { author, title, description, steps, ingredients, tags, categories, ...other } = recipe

        switch (true) {
            case !author:
                throw new Error("Author is required")
            case !title:
                throw new Error("Title is required")
            case !description:
                throw new Error("Description is required")
            case !steps:
                throw new Error("Steps is required")
            case !ingredients:
                throw new Error("Ingredients is required")
            case !tags:
                throw new Error("Tags is required")
            case !categories:
                throw new Error("Categories is required")
        }

        const translatedTitle = await Promise.all(
            langsToTranslate(title[0].lang).map(async (e) => {
                return await translate({ from: title[0].lang, to: e, value: title[0].value })
            })
        )

        const translatedDescription = await Promise.all(
            langsToTranslate(description[0].lang).map(async (e) => {
                return await translate({ from: description[0].lang, to: e, value: description[0].value })
            })
        )

        await Promise.all(
            langsToTranslate(steps[0].lang).map(async (e) => {
                let step = { lang: e, value: [] }
                for (let i of steps[0].value) {
                    const translatedStep = await translate({ from: steps[0].lang, to: e, value: i })
                    step.value.push(translatedStep.value)
                }
                steps.push(step)
            })
        )

        const user = await connection.model("User", UserModel.schema).findById(author)

        const checkIngredients = await connection.model("Ingredient", IngredientModel.schema).find({
            _id: {
                $in: ingredients,
            },
        })
        const checkTags = await connection.model("Tag", TagModel.schema).find({
            _id: {
                $in: tags,
            },
        })
        const checkCategories = await connection.model("Category", CategoryModel.schema).find({
            _id: {
                $in: categories,
            },
        })

        switch (true) {
            case checkIngredients.length != ingredients.length:
                throw new Error("Ingredients not found")
            case checkTags.length != tags.length:
                throw new Error("Tags not found")
            case checkCategories.length != categories.length:
                throw new Error("Categories not found")
            case !user:
                throw new Error("User not found")
        }

        const createdRecipe = {
            title: [...title, ...translatedTitle],
            description: [...description, ...translatedDescription],
            steps,
            ingredients,
            tags,
            categories,
            author,
            ...other,
        }

        const newRecipe = new connection.model("Recipe", RecipeModel.schema)
        const savedRecipe = await newRecipe.create(createdRecipe)

        await savedRecipe.save()
        return savedRecipe
    }

    async createIngredient(body, flag) {
        const validFlags = ["ingredient", "tag", "category"]
        if (!validFlags.includes(flag)) throw new Error("Invalid flag")

        const connection = getConnection()
        if (flag == "ingredient") {
            const { value, lang } = body.ingredient[0]

            switch (true) {
                case !value:
                    throw new Error("Ingredient value is required")
                case !lang:
                    throw new Error("Language is required")
            }

            const ingredient = [{ value, lang }]

            const savedIngredient = await Promise.all(
                langsToTranslate(lang).map(async (e) => await translate({ from: lang, to: e, value }))
            )
                .then((translated) => {
                    translated.forEach((e) => {
                        ingredient.push(e)
                    })
                })
                .then(async () => {
                    const newIngredient = connection.model("Ingredient", IngredientModel.schema)
                    const savedIngredient = await newIngredient.create({ ingredient: ingredient })
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
