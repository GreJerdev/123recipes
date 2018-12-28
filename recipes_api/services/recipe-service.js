"use strict";

const recipe_model = require('../models/recipe-model');
const recipe_db_provider = require('../providers/recipe-db-provider');
const ingredient_service = require('./ingredient-service');
const error = require('../utilities/errors').error;
const uuid = require('uuid');


module.exports = class RecipeService {

    
    constructor(dbproviders = null, services = null) {
        let recipe_db = null;
        let ingredients_db_provider = null;
        
        if (dbproviders){
            recipe_db = dbproviders.recipe;
            ingredients_db_provider =  dbproviders.ingredients
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
            await this.IsParentExist(new_recipe);
            await this.recipe_dbprovider.create_recipe(new_recipe);
            recipe = await this.get_recipe_by_id(new_recipe.id)
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
            await this.IsParentExist(update_recipe);
            await this.recipe_dbprovider.update_recipe(update_recipe);
            recipe = await this.get_recipe_by_id(update_recipe.id)
            console.log("update_recipe - end")
            return Promise.resolve(recipe);
        } catch (err) {
            console.log(`update_recipe - error, ${err}`);
            return Promise.reject(err);
        }   
    }

    async isParentExist(update_recipe) {
        if (update_recipe.parent) {
            let parent = await this.get_recipe_by_id(update_recipe.parent);
            if (!parent) {
                throw error.PARENT_NOT_FOUND;
            }
        }
    }

    async deleteRecipe(recipe_id) {
        try {
            console.log("update_recipe - start")
            let update_recipe = new recipe_model(recipe)
            await this.recipe_dbprovider.update_recipe(update_recipe);
            recipe = await this.get_recipe_by_id(update_recipe.id)
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
            const recipe = await this.recipe_dbprovider.get_list_recipe(search_by, order_by, page_number, page_size);
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
            const recipe = await this.recipe_dbprovider.get_recipe_by_id(recipe_id);
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
            const recipe = await this.recipe_dbprovider.get_recipe_by_id(recipe_id);
            console.log(`${arguments.callee.name} - end`)
            return Promise.resolve(recipe);
        } catch (err) {
            console.log(`${arguments.callee.name} - error, ${err}`);
            return Promise.reject(err);
        }
    }

}


