"use strict";

let mysql_provider = require('./database/mysql_provider')();

module.exports = class IngredientListProvider{

    constructor(){

    }
/*
CREATE TABLE `ingredient_lists` (
  `ingredient_list_id` binary(16) NOT NULL,
  `ingredient_list_name` varchar(45) DEFAULT NULL,
  `ingredient_list_description` text,
  `ingredient_list_is_deleted` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ingredient_list_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

*/

    async createIngredientList(ingredient_list ,conn = null){
        let log_path = 'IngredientListProvider/createIngredientList - start';
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

    async updateIngredientList(ingredient_list ,conn = null){
        let log_path = 'IngredientListProvider/updateIngredientList - start';
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

    async deleteIngredientList(ingredient_list_id ,conn = null){
        let log_path = 'IngredientListProvider/deleteIngredientList - start';
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

    async getListIngredientList(search_by, order_by, page_number, page_size, limit, conn = null){
        let log_path = 'IngredientListProvider/getListIngredientList - start';
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

    async getIngredientList(ingredient_list_id,conn = null){
        let log_path = 'IngredientListProvider/getIngredientList - start';
        try {
            if (!conn) {
                conn = await mysql_provider.getConnection();
            }
            const params = [new_recipe.id, new_recipe.name, new_recipe.parent || null, new_recipe.description];
            await mysql_provider.executeQueryWithConnection(conn, this.insert_query, params);
            let result = await mysql_provider.executeQueryWithConnection(conn, this.select_by_id_query, [new_recipe.id]);
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

};


