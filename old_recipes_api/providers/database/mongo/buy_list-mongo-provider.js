
let mysql_provider = require('../mongodb_provider')();
let BuyList = require('../models/buy-list-model');

module.exports = class BuyListMongo extends MongoDBProvider {

    constructor() {
        super('buy_list');
    }

    static class_name = "BuyListMongo"

    async create(item, conn) {
        let log_path = `${BuyListMongo.class_name}/create -`;
        let is_external_connection = true;
        try {
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async update(item, conn) {
        let log_path = `${BuyListMongo.class_name}/update -`;
        let is_external_connection = false;
        try {
               return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async  delete(id) {
        let log_path = `${BuyListMongo.class_name}/delete -`;
        let is_external_connection = false;
        try {

            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async getById(buy_list_id, conn) {
        let log_path = `${BuyListMongo.class_name}/getById -`;
         try{
            return Promise.resolve(null);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
            return Promise.reject(err);
        }
    }

    async getList(search_by, order_by, page_number, page_size, limit) {
        let log_path = `${BuyListMongo.class_name}/getList -`;
        try {
            if (!conn) {
                conn = await mysql_provider.getConnection();
            }

            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

};


