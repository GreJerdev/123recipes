'use strict'

const pool = require ("./mysql_provider")




function  getMethods(obj) {
    var result = [];
    for (var id in obj) {
      try {
        if (typeof(obj[id]) == "function") {
          result.push(id + ": " + obj[id].toString());
          console.log(id)
        }
      } catch (err) {
        result.push(id + ": inaccessible");
      }
    }
    return result;
  }

  

  pool.getConnection((err, connection)=>{
      console.log(err);
      await connection.beginTransaction();
      await connection.query("select * from buy_lists");
      await connection.commit();
    getMethods(connection);
  });


  
  

