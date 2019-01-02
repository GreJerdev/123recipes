"use strict";

let mysql_provider = require('./database/mysql_provider')();

module.exports = class recipeStepProvider {

    constructor() {

    }

    createRecipeStep(conn = null) {
        let log_path = 'recipe_steps_db_provider/create_recipe_steps -'
        try {
            if (!conn) {
                conn = await mysql_provider.getConnection();
            }
            const params = [new_recipe.id, new_recipe.name, new_recipe.parent || null, new_recipe.description];
            await mysql_provider.executeQueryWithConnection(conn, this.insert_query, params);
            let result = await mysql_provider.executeQueryWithConnection(conn, this.select_by_id_query, [new_recipe.id]);
            mysql_provider.commitTransaction(conn);
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    updateRecipeStep(recipe_step_id, recipe_step_name, recipe_step_number, recipe_step_links, recipe_step_recipe_id, conn = null) {
        let log_path = 'recipe_steps_db_provider/update_recipe_steps -'
        try {
            if (!conn) {
                conn = await mysql_provider.getConnection();
            }
            params = [recipe_step_id, recipe_step_name, recipe_step_number, recipe_step_links, recipe_step_recipe_id];
            let query = `SET @recipe_step_id = ?;
            SET @recipe_step_name = ?;
            SET @recipe_step_number = ?;
            SET @recipe_step_links = ?;
            SET @recipe_step_recipe_id = ?;    
                
            INSERT INTO recipe_steps
            (recipe_step_id,
            recipe_step_name,
            recipe_step_number,
            recipe_step_links,
            recipe_step_recipe_id)
            VALUES
            (@recipe_step_id,
            @recipe_step_name,
            @recipe_step_number,
            @recipe_step_links,
            @recipe_step_recipe_id);`;


            let result = await mysql_provider.executeQueryWithConnection(conn, query, params);
            mysql_provider.commitTransaction(conn);
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    deleteRecipeStep(conn = null) {
        let log_path = 'recipe_steps_db_provider/delete_recipe_steps -'
        try {
            if (!conn) {
                conn = await mysql_provider.getConnection();
            }
            const params = [new_recipe.id, new_recipe.name, new_recipe.parent || null, new_recipe.description];
            await mysql_provider.executeQueryWithConnection(conn, this.insert_query, params);
            let result = await mysql_provider.executeQueryWithConnection(conn, this.select_by_id_query, [new_recipe.id]);
            mysql_provider.commitTransaction(conn);
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    getListRecipeStep(search_by, order_by, page_number, page_size, conn = null) {
        let log_path = 'recipe_steps_db_provider/get_list_recipe_steps -'
        try {
            if (!conn) {
                conn = await mysql_provider.getConnection();
            }
            const params = [search_by, order_by, page_number, page_size || null, new_recipe.description];
            await mysql_provider.executeQueryWithConnection(conn, this.insert_query, params);
            let result = await mysql_provider.executeQueryWithConnection(conn, this.select_by_id_query, [new_recipe.id]);
            mysql_provider.commitTransaction(conn);
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

}


