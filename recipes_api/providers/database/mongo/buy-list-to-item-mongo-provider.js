"use strict";

let db = require('../mongodb_provider');
let BuyListItem = require("../../../models/buy-list-item-model");

module.exports = class BuyListItemsProvider extends db.MongoDBProvider {

    constructor() {
        super();
        this.collection_name = 'buy_list_items';
    }

    async additems(buy_list_id, list_items, conn) {
        let log_path = "BuyListItemsProvider/additems -";
        let is_external_connection = true;
        try {
            logger.verbose(`${log_path} - parameters - buy_list - ${buy_list}`);
            this.db_connection = await this.getConnection();
            let buy_list_collection = this.db_connection.collection(this.collection_name);
            buy_list_id = this.uuid2MongoId(buy_list_id);
            list_items.map(item => {
                item.id = this.uuid2MongoId(item.id);
                item.buy_list_id = buy_list_id;
                if (item.ingredient_id) {
                    item.ingredient_id = this.uuid2MongoId(item.ingredient_id);
                }
            });
            let result = await buy_list_collection.insertMany(list_items);
            let item = await this.getListItems(result.insertedId.toString());
            logger.info(`${log_path} - end`);
            return Promise.resolve(item);

            return Promise.resolve(result);
        } catch (err) {
            if (!is_external_connection) {
                mysql_provider.rollbackTransaction(conn);
            }
            console.log(err);
            return Promise.reject(err);
        }
    }

    async updateBuyItemInList(item_id, type, quantity, unit, bought, conn = null) {
        let log_path = "buy_list_to_item_db_provider/updateBuyListToItem -";
        let is_external_connection = true;
        try {
            return Promise.resolve(result);
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    }

    async removeItemFromList(item_id, conn = null) {
        let log_path = "buy_list_to_item_db_provider/deleteBuyListToItem -";

        try {
            return Promise.resolve(result);
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    }

    async getListItems(list_id, search_by, page_number = 0, page_size = 99999, conn = null) {
        let log_path = "buy_list_to_item_db_provider/getItemsByListId -";
        try {
            logger.info(`${log_path} - start`);
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
                        },
                        {
                            "buy_list_id": this.uuid2MongoId(list_id)
                        }
                    ]
                }
            ;
            let buy_lists = await this.getCollectionList(filter, order_by, page_number, page_size);
            logger.info(`${log_path} - end`);
            return Promise.resolve(result);
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    }
};

