"use strict";

let db = require('../mongodb_provider');
let mongo = require('mongodb');
let BuyList = require("../../../models/buy-list-model");

module.exports = class buyListProvider extends db.MongoDBProvider {

    constructor() {
        super();
        this.collection_name = 'buy_list';
    }

    async create(buy_list, conn) {
        let log_path = 'ingredient_list/create';
        logger.info(`${log_path} - start`);
        let is_external_connection = true;
        try {
            logger.verbose(`${log_path} - parameters - buy_list - ${buy_list}`);
            this.db_connection = await this.getConnection();
            let buy_list_collection = this.db_connection.collection(this.collection_name);
            buy_list._id = this.uuid2MongoId(buy_list.id);
            let result = await buy_list_collection.insertOne(buy_list);
            let item = await this.getById(result.insertedId.toString());
            logger.info(`${log_path} - end`);
            return Promise.resolve(item);
        } catch (err) {
            if (is_external_connection === false) {
            }
            logger.error(`${log_path} error - ${err}`);
            return Promise.reject(err);
        }
    }

    async update(buy_list, conn = null) {
        let log_path = 'ingredient_list/update';
        logger.info(`${log_path} - start`);
        try {
            logger.verbose(`${log_path} - parameters - buy_list - ${buy_list}`);
            let update_results = await db.MongoDBProvider.prototype.updateOne.call(this, buy_list, BuyList, null, conn);
            logger.info(`${log_path} - end`);
            return Promise.resolve(update_results);
        } catch (err) {
            logger.err(`${log_path} error - ${err}`);
            return Promise.reject(err);
        }
    }

    async delete(id, conn) {
        let log_path = 'ingredient_list/delete';
        logger.info(`${log_path} - start`);
        try {
            logger.verbose(`${log_path} - parameters - buy_list_id - ${id}`);
            this.db_connection = await this.getConnection();
            var newvalues = {$set: {is_deleted: false}};
            let buy_lists = await this.deleteFromCollection(id, this.db_connection);
            logger.info(`${log_path} - end`);
            return Promise.resolve(result);
        } catch (err) {
            logger.error(`${log_path} error - ${err}`);
            return Promise.reject(err);
        }
    }

    async getById(id, conn) {
        let log_path = 'buy_list/getById';
        logger.info(`${log_path} - start`);
        try {
            logger.verbose(`${log_path} - parameters - buy_list_id - ${id}`);
            let buy_list = await db.MongoDBProvider.prototype.getById.call(this, id, conn);
            logger.info(`${log_path} - end`);
            return Promise.resolve(buy_list);
        } catch (err) {
            logger.error(`${log_path} error - ${err}`);
            return Promise.reject(err);
        }
    }

    async getList(search_by, order_by, page_number, page_size, connection) {
        let log_path = 'ingredient_list/getList';
        logger.info(`${log_path} - start`);
        try {
            search_by = search_by || '';
            logger.verbose(`${log_path} - parameters - search_by - ${search_by}, order_by - ${order_by}, page_number - ${page_number}, page_size - ${page_size}`);
            let filter = {
                "$and": [
                    {"is_deleted": false},
                    {
                        "$or": [
                            {"name": {"$regex": search_by, "$options": "i"}},
                            {"description": {"$regex": search_by, "$options": "i"}}
                        ]
                    }]
            };
            let buy_lists = await this.getCollectionList(filter, order_by, page_number, page_size);
            logger.info(`${log_path} - end`);
            return Promise.resolve(buy_lists);
        } catch (err) {
            logger.error(`${log_path} error - ${err}`);
            return Promise.reject(err);
        }
    }

};


