const dbprovider = require('../providers/mongo-db-provider');
const config = require('../../config/datastores');
mongo = require('mongodb');

module.exports = function () {

  mongoDBConnString = config.datastores.mongodb.mongoDBConnString;
  dbname = config.datastores.mongodb.dbname;
  db = dbprovider(mongoDBConnString, dbname);


  return {
    find: function (id) {
      let filterId = {'_id': mongo.ObjectID(id)}
      return db.findDocuments('groups', filterId)
    },
    add: function (item) {
      return db.insertDocuments('groups', item)
    },
    update: function (item) {
      return db.updateDocument('groups', item)
    },
    delete: function (id) {
      let filterId = {'_id': mongo.ObjectID(id)}
      return db.removeDocument('groups', filterId)
    },
 }
}();

