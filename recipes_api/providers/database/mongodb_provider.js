let configuration = require('../../configuration/config');

var MongoClient = require('mongodb').MongoClient;

const state = {
    db: null,
};


exports.MongoDBProvider = class MongoDBProvider {

    constructor() {
        this.getConnection().then((connection) => {
            this.db_connection = connection;
            logger.info(`mongodb_provider/constructor - db_connection is set`);
        }).catch((err) => {
            logger.info(`mongodb_provider/constructor - connection error - ${err}`);
        });
        this.collection_name = '';
    }

    async connect() {
        try {
            if (!state.db) {
                const url = configuration.db.mongodb.connection_string;
                let client = await MongoClient.connect(url);
                state.db = client.db(configuration.db.mongodb.data_base);
                logger.info(`mongodb_provider/connect - connected to db - url - ${url}`);
            }
            return Promise.resolve()
        } catch (err) {
            logger.error(`mongodb_provider/connect - parameter query -, ${err}`);
            return Promise.reject(err);
        }
    };

    async getConnection() {
        if (!state.db) {
            await this.connect();
        }
        logger.silly(`mongodb_provider/getConnection - is state.db null ? - ${state.db === null}`);
        return state.db;
    };

    async close() {
        try {
            if (state.db) {
                await state.db.close();
                state.db = null;
                state.mode = null;
                this.db_connection = null;
            }
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err)
        }
    };

    async getCollectionList(filter, order, page_number = 0, page_size = 10, collection_name = null, conn = null) {
        let log_path = 'MongoDBProvider/getCollectionList';
        let is_external_connection = true;
        try {
            this.db_connection = await this.getConnection();
            let buy_list_collection = this.db_connection.collection(collection_name || this.collection_name);
            order = order || {'create_at': 1};
            let items = await buy_list_collection.find(filter || {}).sort(order).skip(page_number > 0 ? ((page_number - 1) * page_size) : 0).limit(page_size).toArray();
            logger.verbose(`${log_path} - result items  - ${items}`);
            return Promise.resolve(items);
        } catch (err) {
            if (is_external_connection === false) {
                mysql_provider.rollbackTransaction(conn);
            }
            logger.error(`${log_path} error - ${err}`);
            return Promise.reject(err);
        }
    }

    async deleteFromCollection(id, conn = null) {
        let log_path = 'MongoDBProvider/deleteFromCollection';
        let is_external_connection = true;
        try {
            conn = conn || await this.getConnection();
            let buy_list_collection = conn.collection(collection_name || this.collection_name);
            let mongo_id = new mongo.Binary(Buffer.from(id, 'utf8'));
            let new_value = {$set: {is_deleted: true}};
            let my_query = {_id: mongo_id};
            let result = await buy_list_collection.updateOne(my_query, new_value);
            logger.verbose(`${log_path} - result items - ${result}`);
            return Promise.resolve(true);
        } catch (err) {
            if (is_external_connection === false) {
                mysql_provider.rollbackTransaction(conn);
            }
            logger.error(`${log_path} error - ${err}`);
            return Promise.reject(err);
        }
    }

};


