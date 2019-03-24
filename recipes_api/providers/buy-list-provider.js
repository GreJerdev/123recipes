"use strict";

let provider_factory = require('./database/datebase-provider-factory')();
let BuyList = require('../models/buy-list-model');

module.exports = class buyListProvider {

    constructor() {
        this.db_connection = provider_factory.getObjectDBProvider('buy_list');
    }

    async createBuyList(buy_list, conn) {
        let log_path = 'buy-list-provider/create_buy_list -';
        let is_external_connection = true;
        try {
            buy_list = await this.db_connection.create(buy_list);
            return Promise.resolve(buy_list);
        } catch (err) {
            if (is_external_connection === false) {

            }
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async updateBuyList(buy_list, conn) {
        let log_path = 'buy-list-provider/update_buy_list -';
        let is_external_connection = false;
        try {
            if (!conn) {

            }
            let result = await this.db_connection.update(buy_list);
            return Promise.resolve(result);
        } catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async deleteBuyList(id, conn) {
        let log_path = 'buy-list-provider/delete_buy_list -';
        let is_external_connection = false;
        try {
            if (!conn) {

            }
            let result = await this.db_connection.delete(id);
            return Promise.resolve(result);
        } catch (err) {
            logger.err(`${log_path} error - ${err}`);
            return Promise.reject(err);
        }
    }

    async getBuyListById(buy_list_id, conn) {
        let log_path = 'buy-list-provider/getBuyListById -';
        let buy_list = new BuyList();

        try {
            let result = await this.db_connection.getById(buy_list_id);
            return Promise.resolve(result);
        } catch (err) {
            logger.err(`${log_path} error - ${err}`);
            return Promise.reject(err);
        }
    }

    async getListOfBuyList(search_by, order_by, page_number, page_size, limit, conn) {
        let log_path = 'buy-list-provider/getListOfBuyList -';
        try {
            let result = await this.db_connection.getList(search_by, order_by, page_number, page_size, limit, conn);
            return Promise.resolve(result);
        } catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

}


