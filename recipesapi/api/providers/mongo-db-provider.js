const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectId;

const mongoDBConnString = 'mongodb://dbuser:buylist1234@ds117899.mlab.com:17899/buy_list';

// Database Name
const db_Name = 'buy_list';


mongoDBProvider = function (mongoDBConnUrl, db_name) {
// Connection URL


  let dbclient = undefined;

  function connect() {
// Use connect method to connect to the server
    return new Promise(function (resolve, reject) {
      MongoClient.connect(mongoDBConnUrl, function (err, client) {
        if (err) {
          reject(err);
        }
        dbclient = client;
        return resolve();
      });
    });
  }

//add
  const insertDocuments = function (collectionname, item) {
    const db = dbclient.db(db_name);
    const collection = db.collection(collectionname);
    collection.insertMany([item], function (err, result) {
      if (err) {
        return reject(err);
      }
      dbclient.close();
      return resolve(data);
    });
  }

  //update
  const updateDocument = function (collectionname, item) {


    return new Promise(function (resolve, reject) {


      const db = dbclient.db(db_name);
      const collection = db.collection(collectionname);

      collection.updateOne({}
        , {}, function (err, result) {
          if (err) {
            return reject(err);
          }
          dbclient.close();

          return resolve(data);
        });
    });
  }

//delete
  const removeDocument = function (collection, deleteid) {

    return new Promise(function (resolve, reject) {

      const db = dbclient.db(db_name);
      const collection = db.collection(collection);
      // Delete document where a is 3
      if (!deletefilter || deletefilter == {}) {
        reject('delete filter is empty')
      }
      collection.deleteOne(deletefilter, function (err, result) {
        if (err) {
          reject(err);
        }
        dbclient.close();
        resolve(result);
      });

    });

    // Get the documents collection

  }

//find all by filter
  const findAll = function (collectionname, filter) {

    return new Promise(function (resolve, reject) {
      const db = dbclient.db(db_name);
      const collection = db.collection(collectionname);
      // Find some documents
      if (filter === undefined) {
        filter = {};
      }
      collection.find(filter).toArray(function (err, data) {
        if (err) {
          return reject(err);
        }
        dbclient.close();

        return resolve(data);
      });

    });

  }

  return {
    findDocuments: function (collectionname, filter) {
      return connect().then(() => findAll(collectionname, filter))
    },
    insertDocuments: function (collectionname, item) {
      return connect().then(() => insertDocuments(collectionname, item))
    },
    updateDocument: function (collectionname, item) {
      return connect().then(() => updateDocument(collectionname, item))
    },
    removeDocument: function (collectionname, deleteid) {
      return connect().then(() => removeDocument(collectionname, deleteid))
    },

  }

}

module.exports = mongoDBProvider;



