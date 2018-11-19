"use strict";

const recipe_model = require('../models/recipe-model');
const recipe_db_provider = require('../providers/recipe-db-provider')
const error = require('../utilities/errors').error;
const uuid = require('uuid');

module.exports = class RecipeService {

    constructor() {
        this.recipe_dbprovider = new recipe_db_provider()
    }

    prefix(){return 'recipe_';} 

    async create_recipe(recipe) {
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

    async update_recipe(recipe) {
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

    async IsParentExist(update_recipe) {
        if (update_recipe.parent) {
            let parent = await this.get_recipe_by_id(update_recipe.parent);
            if (!parent) {
                throw error.PARENT_NOT_FOUND;
            }
        }
    }

    async delete_recipe(recipe_id) {
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

    async get_list_recipe(search_by, order_by, page_number, page_size) {
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

    async get_recipe_by_id(recipe_id){
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

}


