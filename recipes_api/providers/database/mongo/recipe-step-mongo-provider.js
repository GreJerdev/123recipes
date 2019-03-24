"use strict";

let db = require('../mongodb_provider');
let RecipeStep = require("../../../models/recipe-steps-model");

module.exports = class recipeStepProvider {

    constructor() {

    }

    async createRecipeStep(recipe_step, conn = null) {
        let log_path = 'recipe_steps_db_provider/create_recipe_steps -';
        try {
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async updateRecipeStep(recipe_step, conn = null) {
        let log_path = 'recipe_steps_db_provider/update_recipe_steps -';
        try {
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async deleteRecipeStep(conn = null) {
        let log_path = 'recipe_steps_db_provider/delete_recipe_steps -';
        try {
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async getRecipeStepById(id, conn = null) {
        let log_path = 'recipe_steps_db_provider/get_list_recipe_steps -';
        try {
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async getRecipeStepsByRecipeId(recipe_id, conn = null) {
        let log_path = 'recipe_steps_db_provider/get_list_recipe_steps -';
        try {
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

}


