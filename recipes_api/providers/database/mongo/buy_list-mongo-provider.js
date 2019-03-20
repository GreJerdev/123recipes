"use strict";

let db = require('../mongodb_provider')();
let BuyList = require("../../../models/buy-list-model");

module.exports = class buyListProvider {

    constructor() {

    }

    async createBuyList(id, name, description, parent, conn) {
        let log_path = 'ingredient_list/create_buy_list -';
        let is_external_connection = true;
        try {

            return Promise.resolve(result);
        }
        catch (err) {
            if (is_external_connection === false) {
                mysql_provider.rollbackTransaction(conn);
            }
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async updateBuyList(id, name, description, parent, conn) {
        let log_path = 'ingredient_list/update_buy_list -';
        let is_external_connection = false;
        try {
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async  deleteBuyList() {
        let log_path = 'ingredient_list/delete_buy_list -';
        let is_external_connection = false;
        try {
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async getBuyListById(buy_list_id, conn) {
        let log_path = 'buy_list/getBuyListById -';
        try{
            return Promise.resolve(null);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
            return Promise.reject(err);
        }
    }

    async getListOfBuyList(search_by, order_by, page_number, page_size, limit) {
        let log_path = 'ingredient_list/get_list_buy_list -';
        try {
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

};


