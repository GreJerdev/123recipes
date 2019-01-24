"use strict";

let mysql_provider = require('./database/mysql_provider')();

module.exports = class buyListProvider {

    constructor() {

    }

    createBuyList(id, name, description, parent, conn) {
        let log_path = 'ingredient_list/create_buy_list -';
        let is_external_connection = false;
        try {

            if (!conn) {
                conn = await mysql_provider.getConnection();
                is_external_connection = true;
            }

            let query = `
                SET @id = fn_uuid_to_bin(?);
                SET @name = ?;
                SET @description = ?;
                SET @parent  = fn_uuid_to_bin(?) ;
                
                
                INSERT INTO buy_lists
                (
                buy_list_id,
                buy_list_name,
                buy_list_description,
                buy_lists_parent)
                VALUES
                (@id,
                @name,
                @description,
                @parent);
            `;

            const params = [];
            await mysql_provider.executeQueryWithConnection(conn, query, params);
            let result = await mysql_provider.executeQueryWithConnection(conn, this.select_by_id_query, [new_recipe.id]);
            if (is_external_connection) {
                mysql_provider.commitTransaction(conn);
            }
            return Promise.resolve(result);
        }
        catch (err) {
            if (is_external_connection) {
                mysql_provider.rollbackTransaction(conn);
            }
            logger.err(`${log_path} error - ${err}`);
        }
    }

    updateBuyList(id, name, description, parent, conn) {
        let log_path = 'ingredient_list/update_buy_list -'
        let is_external_connection = false;
        try {
            if (!conn) {
                conn = await mysql_provider.getConnection();
            }
            query = `
SET @id = fn_uuid_to_bin(?);
SET @name = ?;
SET @description = ?;
SET @parent  = fn_uuid_to_bin(?) ;

UPDATE buy_lists
SET buy_list_id = @id,
${name ? 'buy_list_name= @name':''},
${description ? 'buy_list_description = @description':''},
${parent ? 'buy_list_parent = @parent':''}
WHERE buy_list_id = @id
            
            `;

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

    deleteBuyList() {
        let log_path = 'ingredient_list/delete_buy_list -'
        let is_external_connection = false;
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

    getBuyListById(buy_list_id, conn) {
        let log_path = 'buy_list/getBuyListById -'

        try {

            if (!conn) {
                conn = await mysql_provider.getConnection();
            }
            let query = `
            SET @buy_list_id = fn_uuid_to_bin(?);

            SELECT fn_uuid_from_bin(buy_list_id) as buy_list_id,
            buy_list_name,
            buy_list_description,
            buy_list_parent,
            buy_list_created_at
            FROM buy_lists
            WHERE buy_list_id = @buy_list_id ;`;
            const params = [buy_list_id];
            await mysql_provider.executeQueryWithConnection(conn, this.insert_query, params);
            let result = await mysql_provider.executeQueryWithConnection(conn, this.select_by_id_query, [new_recipe.id]);
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    getListOfBuyList(search_by, order_by, page_number, page_size, limit) {
        let log_path = 'ingredient_list/get_list_buy_list -'
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

}


