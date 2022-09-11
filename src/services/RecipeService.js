const RecipeModel = require("../models/RecipeModel")
const UserModel = require("../models/UserModel")
const TagModel = require("../models/TagModel")
const CategoryModel = require("../models/CategoryModel")
const UnitModel = require("../models/UnitModel")
const IngredientModel = require("../models/IngredientModel")
const { langs } = require("../utils/langs.util")
const translate = require("../utils/translate.util")

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
        const recipes = await RecipeModel.find({}).populate("ingredients")
        return recipes.map((recipe) => getLang(recipe, lang))
    }

    async getRecipe(id) {
        const recipe = await RecipeModel.findById(id).populate("ingredients")
        return getLang(recipe, "en")
    }

    async createRecipe(recipe) {
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

        const user = await UserModel.findById(author)

        const checkIngredients = await IngredientModel.find({
            _id: {
                $in: ingredients,
            },
        })
        const checkTags = await TagModel.find({
            _id: {
                $in: tags,
            },
        })
        const checkCategories = await CategoryModel.find({
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

        const savedRecipe = await RecipeModel.create(createdRecipe)

        await savedRecipe.save()
        return savedRecipe
    }

    async createMore(body, flag) {
        if (!["ingredient", "tag", "category", "unit"].includes(flag)) throw new Error("Invalid flag")

        if (flag == "ingredient") {
            const translatedIngredient = await genTranslate(body, "ingredient", IngredientModel.schema)
            return translatedIngredient
        }
        if (flag == "tag") {
            const translatedTag = await genTranslate(body, "tag", TagModel.schema)
            return translatedTag
        }
        if (flag == "category") {
            const translatedCategory = await genTranslate(body, "category", CategoryModel.schema)
            return translatedCategory
        }
        if (flag == "unit") {
            const translatedUnit = await genTranslate(body, "unit", UnitModel.schema)
            return translatedUnit
        }
        throw new Error("Something went wrong")
    }
}

async function genTranslate(body, flag, schema) {
    const { value, lang } = body[flag][0]

    switch (true) {
        case !value:
            throw new Error("Value is required")
        case !lang:
            throw new Error("Language is required")
    }

    const data = [{ value, lang }]
    const translated = await Promise.all(
        langsToTranslate(lang).map(async (e) => await translate({ from: lang, to: e, value }))
    )
        .then((translated) => {
            translated.forEach((e) => {
                data.push(e)
            })
        })
        .then(async () => {
            let model = flag.charAt(0).toUpperCase() + flag.slice(1)
            // const newModel = connection.model(model, schema)
            // const savedModel = await newModel.create({ [flag]: data })
            const savedModel = await eval(`${model}Model.create({ [flag]: data })`)
            return savedModel
        })
        .catch((error) => {
            throw new Error(error)
        })

    return translated
}

module.exports = new RecipeService()
