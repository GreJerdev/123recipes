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
            console.log(`connected to url`);
        }
        return Promise.resolve()
    } catch (err) {
        console.log(`fails to connect error ${err}`);
        return Promise.reject(err);
    }
};

exports.get = async() => {

    if(!state.db){
       await exports.connect();
    }
    console.log(`is db null ${state.db === null}`);
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


