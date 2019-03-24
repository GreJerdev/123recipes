"use strict";

let db = require('../mongodb_provider');
let BuyList = require("../../../models/buy-list-model");

async function f() {
    try {
        let d = await db.get();
        let buylist = d.collection('buy_list');
        let dfg = new BuyList();

        buylist.find({"name":"name"})

        dfg.name = "weekend products";
        dfg.description = "";
        dfg.parent = null;
        dfg.create_at = Date.now();

        let result = await buylist.insertOne(dfg);
        //console.log(result);
        console.log(await buylist.find({"_id": result._id}).toArray());
    } catch (err) {
        console.log(` error ${err}`);
    }
}

f();
module.exports = class buyListProvider {

    db_connection = null;
    constructor() {

    }

    async create(buy_list, conn) {
        let log_path = 'ingredient_list/create_buy_list -';

        try {
            this.db_connection = await db.get();
            let result = await this.db_connection.insertOne(buy_list);
            let item = this.getBuyListById(result._id);
            return Promise.resolve(item);
        } catch (err) {
            if (is_external_connection === false) {
                mysql_provider.rollbackTransaction(conn);
            }
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async update(buy_list, conn) {
        let log_path = 'ingredient_list/update_buy_list -';
        try {
            this.db_connection = await db.get();
            await this.db_connection.find({"_id": result._id});
            return Promise.resolve(result);
        } catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async delete(buy_list_id, conn) {
        let log_path = 'ingredient_list/delete_buy_list -';
        try {
            this.db_connection = await db.get();
            return Promise.resolve(result);
        } catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async getById(buy_list_id, conn) {
        let log_path = 'buy_list/getBuyListById -';
        try {
            this.db_connection = await db.get();
            await this.db_connection.find({"_id": buy_list_id});
            return Promise.resolve(null);
        } catch (err) {
            logger.err(`${log_path} error - ${err}`);
            return Promise.reject(err);
        }
    }

    async getList(search_by, order_by, page_number, page_size, limit, connection) {
        let log_path = 'ingredient_list/get_list_buy_list -';
        try {
            this.db_connection = await db.get();
            return Promise.resolve(result);
        } catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

};


