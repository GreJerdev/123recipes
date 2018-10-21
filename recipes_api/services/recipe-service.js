"use strict";

const recipe_model = require('../models/recipe-model');
const recipe_db_provider = require('../providers/recipe-db-provider')
const uuid = require('uuid');

module.exports = class RecipeService {

    constructor() {
        this.recipe_dbprovider = new recipe_db_provider()
    }

    async create_recipe(recipe) {
        try {
            let new_recipe = new recipe_model(recipe)
            new_recipe.id = uuid();
            console.log("create_recipe - start")
            recipe = await this.recipe_dbprovider.create_recipe(new_recipe);
            console.log("create_recipe - end")
            return Promise.resolve(recipe);
        } catch (err) {
            console.log(`create_recipe - error, ${err}`);
            console.log("create_recipe - end")
            return Promise.reject(err);
        }
    }

    async update_recipe() {

    }

    async delete_recipe() {

    }

    async get_list_recipe(search_by, order_by, page_number, page_size, limit) {

    }

}


