let configuration = require('../../configuration/config');

var MongoClient = require('mongodb').MongoClient;

var state = {
    db: null,
};


exports.MongoDBProvider = class MongoDBProvider{

};


exports.connect = async () => {
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

exports.get = async() => {

    if(!state.db){
       await exports.connect();
    }
    logger.silly(`mongodb_provider/get - is state.db null ? - ${state.db === null}`);
    return state.db;
};

exports.close = async () => {
    try {
        if (state.db) {
            await state.db.close();
            state.db = null;
            state.mode = null;
        }
        return Promise.resolve()
    } catch (err) {
        return Promise.reject(err)
    }
};


