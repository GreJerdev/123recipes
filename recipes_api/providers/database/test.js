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
  
  console.log( "before getPoolConnectionTransaction ")
 pool.getPoolConnectionTransaction().then(
   async conn=>{
    console.log( "1")
     try{ console.log(`connection ${conn}`);
     let s = await conn.query("select * from buy_lists")
   console.log( "after query")
   await conn.commit();
   console.log( "after commit")
   }
   catch(err){
    console.log( err);
   }
   return "finished -=-=-=-=-=-=";
  }
  ).then( a=> console.log( a)).catch(err=>console.log(err));

  console.log( "after getPoolConnectionTransaction ")
  

