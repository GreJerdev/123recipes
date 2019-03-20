"use strict";

let db = require('../mongodb_provider');
let BuyList = require("../../../models/buy-list-model");

async function f() {
    try {
        await db.connect();
        let d = db.get();
        let buylist = d.collection('buy_list');
        let dfg = new BuyList();

        dfg.name = "weekend products";
        dfg.description = "";
        dfg.parent = null;
        dfg.create_at = Date.now();

        let result = await buylist.insertOne(dfg);
        console.log(result);
        console.log(await buylist.find({"_id": result._id}).toArray());
    } catch (err) {
        console.log(` error ${err}`);
    }
}

f();
module.exports = class buyListProvider {

    constructor() {

    }

    async createBuyList(id, name, description, parent, conn) {
        let log_path = 'ingredient_list/create_buy_list -';
        let is_external_connection = true;
        try {

            return Promise.resolve(result);
        } catch (err) {
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
        } catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async deleteBuyList() {
        let log_path = 'ingredient_list/delete_buy_list -';
        let is_external_connection = false;
        try {
            return Promise.resolve(result);
        } catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async getBuyListById(buy_list_id, conn) {
        let log_path = 'buy_list/getBuyListById -';
        try {
            return Promise.resolve(null);
        } catch (err) {
            logger.err(`${log_path} error - ${err}`);
            return Promise.reject(err);
        }
    }

    async getListOfBuyList(search_by, order_by, page_number, page_size, limit) {
        let log_path = 'ingredient_list/get_list_buy_list -';
        try {
            return Promise.resolve(result);
        } catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

};


