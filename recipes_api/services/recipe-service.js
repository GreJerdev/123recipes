"use strict";

const recipe_model = require('../models/recipe-model');
const recipe_db_provider = require('../providers/recipe-provider');
const ingredient_service = require('./ingredient-service');
const error = require('../utilities/errors').error;
const uuid = require('uuid');


module.exports = class RecipeService {

    
    constructor(db_providers = null, services = null) {
        let recipe_db = null;
        let ingredients_db_provider = null;
        
        if (dbproviders){
            recipe_db = db_providers.recipe;
            ingredients_db_provider =  db_providers.ingredients
        }
        this.ingredients_service = (services && services.ingredient)? services.ingredient : new ingredient_service(ingredients_db_provider);
        this.recipe_db_provider = recipe_db_provider || new recipe_db_provider()
    }

    prefix(){return 'recipe_';} 

    async createRecipe(recipe) {
        try {
            console.log("create_recipe - start")
            let new_recipe = new recipe_model(recipe)
            new_recipe.id = uuid();
            await this.isParentExist(new_recipe);
            await this.recipe_db_provider.createRecipe(new_recipe);
            recipe = await this.getRecipeById(new_recipe.id)
            console.log("create_recipe - end")
            return Promise.resolve(recipe);
        } catch (err) {
            console.log(`create_recipe - error, ${err}`);
            return Promise.reject(err);
        }
    }

    async updateRecipe(recipe) {
        try {
            console.log("update_recipe - start")
            let update_recipe = new recipe_model(recipe)
            await this.isParentExist(update_recipe);
            await this.recipe_db_provider.updateRecipe(update_recipe);
            recipe = await this.getRecipeById(update_recipe.id)
            console.log("update_recipe - end")
            return Promise.resolve(recipe);
        } catch (err) {
            console.log(`update_recipe - error, ${err}`);
            return Promise.reject(err);
        }   
    }

    async isParentExist(update_recipe) {
        if (update_recipe.parent) {
            let parent = await this.getRecipeById(update_recipe.parent);
            if (!parent) {
                throw error.PARENT_NOT_FOUND;
            }
        }
    }

    async deleteRecipe(recipe_id) {
        try {
            console.log("update_recipe - start")
            let update_recipe = new recipe_model(recipe)
            await this.recipe_db_provider.updateRecipe(update_recipe);
            let recipe = await this.getRecipeById(update_recipe.id)
            console.log("update_recipe - end")
            return Promise.resolve(recipe);
        } catch (err) {
            console.log(`update_recipe - error, ${err}`);
            return Promise.reject(err);
        }   
    }

    async getListRecipe(search_by, order_by, page_number, page_size) {
        try {
            console.log("get_list_recipe - start")
            const recipe = await this.recipe_db_provider.getListRecipe(search_by, order_by, page_number, page_size);
            console.log("get_list_recipe - end")
            return Promise.resolve(recipe);
        } catch (err) {
            console.log(`get_list_recipe - error, ${err}`);
          
            return Promise.reject(err);
        } 
    }

    async getRecipeById(recipe_id){
        try {
            console.log("get_recipe_by_id - start")
            const recipe = await this.recipe_db_provider.getRecipeById(recipe_id);
            console.log("get_recipe_by_id - end")
            return Promise.resolve(recipe);
        } catch (err) {
            console.log(`get_recipe_by_id - error, ${err}`);
            return Promise.reject(err);
        }
    
    } 

    async setRecipeIngredients(recipe_id, ingredients){
        try {
            console.log(`${arguments.callee.name} - start`)
          
            if(this.ingredients_service.validateIngredients(ingredients) === false){
                return Promise.reject(error.INVALID_INGREDIENT);
            }
            const recipe = await this.recipe_db_provider.getRecipeById(recipe_id);
            console.log(`${arguments.callee.name} - end`)
            return Promise.resolve(recipe);
        } catch (err) {
            console.log(`${arguments.callee.name} - error, ${err}`);
            return Promise.reject(err);
        }
    }

}


