"use strict";

let mongodb_provider = require('./database/mongodb_provider')();
let BuyList = require('../models/buy-list-model');

module.exports = class buyListProvider(MongoDBProvider)  {

    constructor() {

    }

    async createBuyList(id, name, description, parent, conn) {
        let log_path = 'ingredient_list/create_buy_list -';
        let is_external_connection = true;
        try {

            if (!conn) {
                conn = await mongodb_provider.getConnection();
                is_external_connection = false;
            }


            const params = [id, name, description, parent];
            await mongodb_provider.executeQueryWithConnection(conn, query, params);
            let result = await this.getBuyListById(id, conn);
            logger.silly(`${log_path} result - ${result}`);

            if (is_external_connection === false) {
                await mongodb_provider.commitTransaction(conn);
            }
            logger.info(`${log_path} end `);
            return Promise.resolve(result);
        } catch (err) {
            if (is_external_connection === false) {
                mongodb_provider.rollbackTransaction(conn);
            }
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async updateBuyList(id, name, description, parent, conn) {
        let log_path = 'ingredient_list/update_buy_list -'
        let is_external_connection = false;
        try {
            if (!conn) {
                conn = await mongodb_provider.getConnection();
            }


            const params = [new_recipe.id, new_recipe.name, new_recipe.parent || null, new_recipe.description];
            await mongodb_provider.executeQueryWithConnection(conn, this.insert_query, params);
            let result = await this.getBuyListById(new_recipe.id);
            mongodb_provider.commitTransaction(conn);
            return Promise.resolve(result);
        } catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async deleteBuyList() {
        let log_path = 'ingredient_list/delete_buy_list -'
        let is_external_connection = false;
        try {
            if (!conn) {
                conn = await mongodb_provider.getConnection();
            }
            const params = [new_recipe.id, new_recipe.name, new_recipe.parent || null, new_recipe.description];
            await mongodb_provider.executeQueryWithConnection(conn, this.insert_query, params);
            let result = await mongodb_provider.executeQueryWithConnection(conn, this.select_by_id_query, [new_recipe.id]);
            mongodb_provider.commitTransaction(conn);
            return Promise.resolve(result);
        } catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async getBuyListById(buy_list_id, conn) {
        let log_path = 'buy_list/getBuyListById -'
        let buy_list = new BuyList();

        try {

            const params = [buy_list_id];
            let result = await mongodb_provider.executeQueryWithConnection(conn, query, params);
            if (result && result) {
                buy_list.description = result[1][0].buy_list_description;
                buy_list.name = result[1][0].buy_list_name;
                buy_list.parent = result[1][0].buy_list_parent;
                buy_list.create_at = result[1][0].buy_list_created_at;
                buy_list.id = result[1][0].buy_list_id;
                return Promise.resolve(buy_list);
            }

            return Promise.resolve(null);
        } catch (err) {
            logger.err(`${log_path} error - ${err}`);
            return Promise.reject(err);
        }
    }

    async getListOfBuyList(search_by, order_by, page_number, page_size, limit) {
        let log_path = 'ingredient_list/get_list_buy_list -'
        try {
            if (!conn) {
                conn = await mongodb_provider.getConnection();
            }
            const params = [new_recipe.id, new_recipe.name, new_recipe.parent || null, new_recipe.description];
            await mongodb_provider.executeQueryWithConnection(conn, this.insert_query, params);
            let result = await mongodb_provider.executeQueryWithConnection(conn, this.select_by_id_query, [new_recipe.id]);
            mongodb_provider.commitTransaction(conn);
            return Promise.resolve(result);
        } catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

}


