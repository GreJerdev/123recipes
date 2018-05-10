const dbprovider = require('../providers/mongo-db-provider');
const config = require('../../config/datastores');


module.exports = function () {


  console.log(config.mongodb);
  mongoDBConnString = config.datastores.mongodb.mongoDBConnString;
  dbname = config.datastores.mongodb.dbname;
  db = dbprovider(mongoDBConnString, dbname);


  return {
    find: function (filter) {
     cd.. return db.findDocuments('groups', filter)
    },

  }
}

console.log(config);

let groupservie = module.exports();
groupservie.find({}).then(console.log);
