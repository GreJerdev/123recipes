"use strict";

let mysql_provider = require('./database/mysql_provider')();
let models = require('../models/recipe-model');

module.exports = class recipe {

    constructor() {

    }

    async create_recipe(new_recipe) {
        try {
            const conn = await mysql_provider.getConnection();
            const query = `SET @id = fn_uuid_to_bin(?) ;
            SET @recipe_name = ? ;
            SET @parent = ? ;
            SET @description = ? ;

            INSERT INTO recipes
            (recipe_id,
            recipe_parent,
            recipe_name,
            recipe_description)
            VALUES
            ( 
            @id,
            @parent,
            @recipe_name,
            @description
            );`;
            const params = [new_recipe.id, new_recipe.name, new_recipe.parent || null, new_recipe.description];
            await mysql_provider.executeQueryWithConnection(conn, query, params);
            mysql_provider.commitTransaction(conn);
            let result = await mysql_provider.execute_query('select fn_uuid_from_bin(recipe_id) as recipe_id,recipe_parent,recipe_name,recipe_description from recipes;');
            return Promise.resolve(result);
        } catch (err) {
            console.log(err)
            return Promise.reject(err);
        }
    }

    async update_recipe() {

    }

    async delete_recipe() {

    }

    async get_list_recipe(search_by, order_by, page_number, page_size, limit) {
        try {
            let result = await mysql_provider.execute_query('select fn_uuid_from_bin(recipe_id) as recipe_id,recipe_parent,recipe_name,recipe_description from recipes;');
            return Promise.resolve(result);
        } catch (err) {
            console.log(err)
            return Promise.reject(err);
        }
    }

}


