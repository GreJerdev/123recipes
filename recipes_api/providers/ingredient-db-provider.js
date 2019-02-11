"use strict";

let mysql_provider = require('./database/mysql_provider')();

module.exports = class IngredientProvider {

    constructor() {

    }
/*
CREATE TABLE `ingredients` (
  `ingredient_id` binary(16) NOT NULL,
  `ingredient_name` varchar(45) DEFAULT NULL,
  `ingredient_measuring_unit` varchar(45) DEFAULT NULL,
  `ingredient_measuring_size` double DEFAULT NULL,
  `ingredient_is_deleted` tinyint(1) DEFAULT '0',
  `ingredient_price` double DEFAULT NULL,
  `ingredient_price_currency_iso3` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`ingredient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/

    createIngredient(id, name, measuring_unit, measuring_size, price, price_currency_iso3, conn = null) {
        let log_path = 'IngredientProvider/createIngredient -'
        let is_conn_external = true;
        try {
            if (!conn) {
                conn = await mysql_provider.getConnection();
                is_conn_external = false;
            }
            let query = ` SET @id = fn_uuid_from_bin(?);
            SET @name = ?;
            SET @measuring_unit = ?;
            SET @measuring_size = ?;
            SET @price = ?;
            SET @price_currency_iso3 = ?;
            
            INSERT INTO ingredients
            (
            ingredient_id,
            ingredient_name,
            ingredient_measuring_unit,
            ingredient_measuring_size,
            ingredient_price,
            ingredient_price_currency_iso3
            )
            VALUES
            (
            @id,
            @name,
            @measuring_unit,
            @measuring_size,
            @price,
            @price_currency_iso3
            );`;

            const params = [id, name, measuring_unit, measuring_size, price, price_currency_iso3];
            await mysql_provider.executeQueryWithConnection(conn, query, params);
            let result = await mysql_provider.executeQueryWithConnection(conn, this.select_by_id_query, [new_recipe.id]);
            if (!is_conn_external) {
                mysql_provider.commitTransaction(conn);
            }
            return Promise.resolve(result);
        }
        catch (err) {
            if (!is_conn_external) {
                mysql_provider.rollbackTransaction(conn);
            }
            logger.err(`${log_path} error - ${err}`);
        }
    }

    updateIngredient() {
        let log_path = 'IngredientProvider/updateIngredient -'
        let is_conn_external = true;
        try {
            if (!conn) {
                conn = await mysql_provider.getConnection();
                is_conn_external = false;
            }
            const params = [new_recipe.id, new_recipe.name, new_recipe.parent || null, new_recipe.description];
            let query = `
            
            `;
            
            await mysql_provider.executeQueryWithConnection(conn,query , params);
            let result = await mysql_provider.executeQueryWithConnection(conn, this.select_by_id_query, [new_recipe.id]);
            if (!is_conn_external) {
                mysql_provider.commitTransaction(conn);
            }
            return Promise.resolve(result);
        }
        catch (err) {
            if (!is_conn_external) {
                mysql_provider.rollbackTransaction(conn);
            }
            logger.err(`${log_path} error - ${err}`);
        }
    }

    deleteIngredient() {
        let log_path = 'IngredientProvider/deleteIngredient -'
        let is_conn_external = true;
        try {
            if (!conn) {
                conn = await mysql_provider.getConnection();
                is_conn_external = false;
            }
            const params = [new_recipe.id, new_recipe.name, new_recipe.parent || null, new_recipe.description];
            let query = `
            
            `;
            const params = [new_recipe.id, new_recipe.name, new_recipe.parent || null, new_recipe.description];
            await mysql_provider.executeQueryWithConnection(conn,query , params);
            let result = await mysql_provider.executeQueryWithConnection(conn, this.select_by_id_query, [new_recipe.id]);
            if (!is_conn_external) {
                mysql_provider.commitTransaction(conn);
            }
            return Promise.resolve(result);
        }
        catch (err) {
            if (!is_conn_external) {
                mysql_provider.rollbackTransaction(conn);
            }
            logger.err(`${log_path} error - ${err}`);
        }
    }

    getListIngredient(search_by, order_by, page_number, page_size, limit) {

    }

}


