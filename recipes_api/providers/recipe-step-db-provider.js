"use strict";

let mysql_provider = require('./database/mysql_provider')();

module.exports = class recipeStepProvider {

    constructor() {

    }

    async createRecipeStep(id ,name ,number ,links ,recipe_id, conn = null) {
        let log_path = 'recipe_steps_db_provider/create_recipe_steps -'
        try {
            if (!conn) {
                conn = await mysql_provider.getConnection();
            }

            const query  = `SET  @id = fn_uuid_to_bin(?);
            SET  @name = ?;
            SET  @number = ?;
            SET  @links = ?;
            SET  @recipe_id = fn_uuid_to_bin(?);
            
            INSERT INTO recipe_steps
            (recipe_step_id,
            recipe_step_name,
            recipe_step_number,
            recipe_step_links,
            recipe_step_recipe_id)
            VALUES
            (@id,
             @name,
             @number,
             @links,
             @recipe_id);
            `;
            const params = [id ,name ,number , JSON.stringify(links) ,recipe_id];
            await mysql_provider.executeQueryWithConnection(conn, query, params);
            let result = await mysql_provider.executeQueryWithConnection(conn, this.select_by_id_query, [new_recipe.id]);
            mysql_provider.commitTransaction(conn);
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async updateRecipeStep(id ,name ,number ,links ,recipe_id, conn = null) {
        let log_path = 'recipe_steps_db_provider/update_recipe_steps -'
        try {
            if (!conn) {
                conn = await mysql_provider.getConnection();
            }
            const params = [id ,name ,number , JSON.stringify(links) ,recipe_id];
            let query = `SET @recipe_step_id =  fn_uuid_to_bin(?);
            SET @recipe_step_name = ?;
            SET @recipe_step_number = ?;
            SET @recipe_step_links = ?;
            SET @recipe_step_recipe_id =  fn_uuid_to_bin(?);    
                
            UPDATE recipe_steps
            SET
            recipe_step_id = recipe_step_id
            ${name?',recipe_step_name  = @recipe_step_name':'' }
            ${number?',recipe_step_number = @recipe_step_number':'' }
            ${links?',recipe_step_links = @recipe_step_links':'' }
            WHERE recipe_step_id = @recipe_step_id
            AND recipe_step_is_deleted = 0;`;


            let result = await mysql_provider.executeQueryWithConnection(conn, query, params);
            mysql_provider.commitTransaction(conn);
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async deleteRecipeStep(conn = null) {
        let log_path = 'recipe_steps_db_provider/delete_recipe_steps -'
        try {
            if (!conn) {
                conn = await mysql_provider.getConnection();
            }

            let query = `SET @recipe_step_id =  fn_uuid_to_bin(?);
           
                
            UPDATE recipe_steps
            SET
            recipe_step_is_deleted = 1
            WHERE recipe_step_id = @recipe_step_id;`;

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

    async getRecipeStepById(id, conn = null) {
        let log_path = 'recipe_steps_db_provider/get_list_recipe_steps -'
        try {
            if (!conn) {
                conn = await mysql_provider.getConnection();
            }
            let query = `
            SET @id = fn_uuid_to_bin(?);
            
            SELECT fn_uuid_from_bin(recipe_step_id) AS recipe_step_id,
            recipe_step_name,
            recipe_step_number,
            recipe_step_links,
            fn_uuid_from_bin(recipe_step_recipe_id) AS recipe_step_recipe_id
            FROM recipe_steps
            WHERE recipe_step_id = @id
            AND recipe_step_is_deleted = 0 ;`;
            const params = [id];
            await mysql_provider.executeQueryWithConnection(conn, this.insert_query, params);
            let result = await mysql_provider.executeQueryWithConnection(conn, this.select_by_id_query, [new_recipe.id]);
            mysql_provider.commitTransaction(conn);
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async getRecipeStepsByRecipeId(recipe_id, conn = null) {
        let log_path = 'recipe_steps_db_provider/get_list_recipe_steps -'
        try {
            if (!conn) {
                conn = await mysql_provider.getConnection();
            }
            let query = `
            SET @recipe_id = fn_uuid_to_bin(?);
            
            SELECT fn_uuid_from_bin(recipe_step_id) AS recipe_step_id,
            recipe_step_name,
            recipe_step_number,
            recipe_step_links,
            fn_uuid_from_bin(recipe_step_recipe_id) AS recipe_step_recipe_id
            FROM recipe_steps
            WHERE recipe_step_recipe_id = @recipe_id
            AND recipe_step_is_deleted = 0 ;`;
            const params = [recipe_id];
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


