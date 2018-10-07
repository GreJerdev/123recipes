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
    database: mysql_config.connection.database
})



pool.getConnection((err, connection) => {
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
})



pool.query = util.promisify(pool.query);




module.exports = pool;