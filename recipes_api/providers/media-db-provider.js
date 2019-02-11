"use strict";
let mysql_provider = require('./database/mysql_provider')();

module.exports = class MediaProvider{

    constructor(){

    }
/*CREATE TABLE `media` (
  `media_id` binary(16) NOT NULL,
  `media_type` int(5) DEFAULT NULL,
  `media_link` varchar(1000) DEFAULT NULL,
  `media_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`media_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
 */
    createMedia(){

    }

    updateMedia(){

    }

    deleteMedia(){

    }

    getListMedia(search_by, order_by, page_number, page_size, limit){

    }

}


