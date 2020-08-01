//const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectId;
const config = require("../../configuration/config");

import {MongoClient} from 'mongodb';

class MongoDBProvider {
    constructor(collection_name) {
        if (!collection_name) {
            throw 'MongoDB collection name is empty'
        }
        this.collection_name = collection_name;
    }

    static __connection = null;
    static class_name = "MongoDBProvider";

    static async initConnection() {
        const option = {
            db: {
                numberOfRetries: 5
            },
            server: {
                auto_reconnect: true,
                poolSize: 40,
                socketOptions: {
                    connectTimeoutMS: 500
                }
            },
            replSet: {},
            mongos: {}
        };
        let url = config["db"]["mongodb"]["connection_string"];
        let connection = await MongoClient.connect(url, option);
        return connection;
    }

    static async getConnecton() {
        try {
            if (!MongoDBProvider.__connection) {
                MongoDBProvider.__connection = await MongoDBProvider.initConnection()
            }
            return await MongoDBProvider.__connection

        } catch (e) {
            throw e
        }

    }


    async create(item, conn) {
        let log_path = `${BuyListMongo.class_name}/create -`;
        let is_external_connection = true;
        let result = null;
        try {
            result = await MongoDBProvider.getConnecton().collection(this.collection_name).insertOne(item)
        } catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
        return result;
    }

    async update(item, conn) {
        let log_path = `${BuyListMongo.class_name}/update -`;
        let is_external_connection = false;
        let result = null;
        try {
            result = await MongoDBProvider.getConnecton().collection(this.collection_name).updateOne({"id": item.id}, {$set: item});
            return result;
        } catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async delete(id) {
        let log_path = `${BuyListMongo.class_name}/delete -`;
        let is_external_connection = false;
        let result = null;
        try {
            result = await MongoDBProvider.getConnecton().collection(this.collection_name).updateOne({"id": id}, {$set: {"is_deleted": true,}});
            return result;
        } catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async getById(id, conn) {
        let log_path = `${BuyListMongo.class_name}/getById -`;
        let result = null;
        try {
            result = await MongoDBProvider.getConnecton().collection(this.collection_name).findOne({"id": id});
            return result;
        } catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async getList(search_by, order_by, page_number, page_size, limit) {
        let log_path = `${BuyListMongo.class_name}/getList -`;
        let result = null;
        try {
            result = await MongoDBProvider.getConnecton().collection(this.collection_name).updateOne(search_by, {$set: item});
            return result;
        } catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

}


module.exports = MongoDBProvider;



