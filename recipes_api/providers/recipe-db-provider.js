"use strict";

let mysql_provider = require('./database/mysql_provider')();
let models = require('../models/recipe-model');

module.exports = class recipe {

    constructor() {

        this.insert_query = `SET @recipe_id = fn_uuid_to_bin(?) ;
SET @recipe_name = ? ;
SET @recipe_parent = ? ;
SET @recipe_description = ? ;

INSERT INTO recipes
(recipe_id,
recipe_parent,
recipe_name,
recipe_description)
VALUES
( 
@recipe_id,
@recipe_parent,
@recipe_name,
@recipe_description
);`
        this.select_by_id_query = `SET @recipe_id = fn_uuid_to_bin(?);
        select fn_uuid_from_bin(recipe_id) as recipe_id,
        fn_uuid_from_bin(recipe_parent) as recipe_parent,
        recipe_name,
        recipe_description 
        from recipes 
        where recipe_id = @recipe_id`;
    }

    async create_recipe(new_recipe) {
        try {
            const conn = await mysql_provider.getConnection();

            const params = [new_recipe.id, new_recipe.name, new_recipe.parent || null, new_recipe.description];
            await mysql_provider.executeQueryWithConnection(conn, this.insert_query, params);
            let result = await mysql_provider.executeQueryWithConnection(conn, this.select_by_id_query, [new_recipe.id]);
            mysql_provider.commitTransaction(conn);
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
            let result = await mysql_provider.execute_query('select fn_uuid_from_bin(recipe_id) as recipe_id,fn_uuid_from_bin(recipe_parent) as recipe_parent,recipe_name,recipe_description from recipes;');
            return Promise.resolve(result);
        } catch (err) {
            console.log(err)
            return Promise.reject(err);
        }
    }

    async get_recipe_by_id(recipe_id) {
        try {
            let result = await mysql_provider.execute_query(this.select_by_id_query, [recipe_id]);
            if (result.length > 0) {
                return Promise.resolve(result[0]);
            }
            return Promise.reject("Error_Recipe_Not_exist")
        } catch (err) {
            console.log(err)
            return Promise.reject(err);
        }
    }

}


