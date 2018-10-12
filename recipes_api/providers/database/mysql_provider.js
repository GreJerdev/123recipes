const config = require( "../../configuration/config");
const util = require('util');

if(!config || !config["db"] || !config["db"]["mysql"]){
    console.log(config.db);
    console.error("db configuration does not found");
    throw "db configuration does not found"
}

const mysql = require('mysql')
const mysql_config = config["db"]["mysql"]
const pool = mysql.createPool({
    connectionLimit: 30,
    host: mysql_config.connection.host,
    user: mysql_config.connection.user,
    password: mysql_config.connection.password,
    database: mysql_config.connection.database,
    supportBigNumbers: true,
    bigNumberStrings: true
})


pool.getConnection = util.promisify(pool.getConnection);
/*pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    return
})*/



pool.query = util.promisify(pool.query);



let cdLogger = {};
cdLogger.error = console.error;
cdLogger.info = console.log;

const uuid = require('uuid/v4');
pool.getPoolConnectionTransaction = async ()=>{ 
    try {
      cdLogger.error(`getPoolConnectionTransaction :)`);
      let connection =null;
      connection = await pool.getConnection();
      cdLogger.info( `connecton created ${connection}`);
      await connection.beginTransaction()
      cdLogger.info( "transaction begin");
      
      return Promise.resolve(connection);  
    }
    catch (error) {
      cdLogger.error(`pool.getPoolConnection error: `, error);
      return Promise.reject( error);
    }
 
}


pool.commitTransaction = async(connection) => {

  return Promise((resolve, reject) => {
    try {
      console.log(`MySQLProvider.commitTransaction start`);
      connection.commit((err) => {
        if (err) {
          return reject(err)
        }
        else {
          connection.release();
          return resolve(true);
        }
      });
    }
    catch (err) {
      console.error(`MySQLProvider.getPoolConnection error: `, err);
      return reject(err);
    }
  });
}


pool.rollbackTransaction = async(connection)=> {

  return Promise((resolve, reject) => {
    try {
      if (connection) {
        console.log(`MySQLProvider.rollbackTransaction start`);
        connection.rollback(() => {
         // cdLogger.error('rollback');
          connection.release();
          return resolve(true);
        });
      }
      else {
        return reject("GENERAL_ERROR");
      }
    }
    catch (err) {
     console.error(`MySQLProvider.getPoolConnection error: `, err);
      return reject(err);
    }
  });
}

//create update 
pool.executePromisedQueryFilterOkPacket = async (query, params)=> {

  return Promise((resolve, reject) => {
    try {
      if (process.env.NODE_ENV !== 'production') {
        console.info(`MySQLProvider.executePromisedQueryFilterOkPacket (${query}) start`);
      }
      pool.query(query, params, (err_query, result) => {
        return resolve(this.handleQueryResponse(err_query, result));
      });
    }
    catch (err) {
     //cdLogger.error(`MySQLProvider.executePromisedQueryFilterOkPacket (${query}) error: `, err);
      return reject(err);
    }
  });
}



module.exports = pool;