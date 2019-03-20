"use strict";

let db = require('../mongodb_provider')();
let Recipe = require("../models/recipe-model");

module.exports = class RecipeProvider {
  constructor() { }

    async createRecipe(new_recipe, conn = null) {
        try {
            return Promise.resolve(result);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async updateRecipe(update_recipe, conn = null) {
        let is_external_connection = true;
        try {
            return Promise.resolve(result);
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    }

    async deleteRecipe(recipe_id, conn = null) {
        let is_external_connection = true;
        try {
            return Promise.resolve(result);
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    }

    async getListRecipe(search_by, order_by,page_number, page_size) {
        try {
      return Promise.resolve(result);
    } catch (err) {
      logger.log(err);
      return Promise.reject(err);
    }
  }

  async getRecipeById(recipe_id, conn = null) {
    try {
      let result = await mysql_provider.executePromisedQueryConnection(conn, this.select_by_id_query, [
        recipe_id
      ]);
      if (result.length > 0) {
        return Promise.resolve(result[0]);
      }
      return Promise.reject("Error_Recipe_Not_exist");
    } catch (err) {
      logger.log(err);
      return Promise.reject(err);
    }
  }
};
