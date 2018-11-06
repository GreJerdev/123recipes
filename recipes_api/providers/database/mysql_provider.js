"use strict";

const config = require("../../configuration/config");
const util = require('util');


module.exports = () => {
  if (!config || !config["db"] || !config["db"]["mysql"]) {
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
    bigNumberStrings: true,
    multipleStatements:true
  })


  pool.getConnection = util.promisify(pool.getConnection);

  pool.query = util.promisify(pool.query);

  const execute_query = async (query, params) => {
    try {
      console.log(`executing ${query}`);
      let results = await pool.query(query, params);
      return Promise.resolve(results[1]);
    } catch (err) {
      console.error(err);

    }
  }

  const executePromisedQueryConnection = async (connection, query, params) => {
    try {
      console.log(`executing ${query}`);

      let results = await connection.query(query, params);
      return Promise.resolve(results);
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  }

  let cdLogger = {};
  cdLogger.error = console.error;
  cdLogger.info = console.log;

  const uuid = require('uuid/v4');
  pool.getPoolConnectionTransaction = async () => {
    try {
      cdLogger.error(`getPoolConnectionTransaction :)`);
      let connection = null;
      connection = await pool.getConnection();
      connection.query = util.promisify(connection.query);
      //  connection.commit = util.promisify(connection.commit);
      //  connection.rollback = util.promisify(connection.rollback);

      cdLogger.info(`connecton created ${connection}`);
      await connection.beginTransaction()
      cdLogger.info("transaction begin");

      return Promise.resolve(connection);
    }
    catch (error) {
      cdLogger.error(`pool.getPoolConnection error: `, error);
      return Promise.reject(error);
    }

  }

  pool.commitTransaction = async (connection) => {

    return new Promise((resolve, reject) => {
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
        if (connection) {
          connection.release();
        }
        console.error(`MySQLProvider.getPoolConnection error: `, err);
        return reject(err);
      }
    });
  }


  pool.rollbackTransaction = async (connection) => {

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
        if (connection) {
          connection.release();
        }
        console.error(`MySQLProvider.getPoolConnection error: `, err);
        return reject(err);
      }
    });
  }

  const getOnlyData = (mySQLresponse)  => {

  } 

  return {
    "execute_query": execute_query,
    "getConnection": pool.getPoolConnectionTransaction,
    "commitTransaction": pool.commitTransaction,
    "rollbackTransaction": pool.rollbackTransaction,
    "executeQueryWithConnection": executePromisedQueryConnection,
    "getOnlyData":getOnlyData
  }

}