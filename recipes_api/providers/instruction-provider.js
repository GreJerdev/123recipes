"use strict";

let mysql_provider = require('./database/mysql_provider')();

module.exports = class InstructionProvider{

    constructor(){

    }
/*
CREATE TABLE `instructions` (
  `instruction_id` binary(16) NOT NULL,
  `instruction_order` int(10) DEFAULT NULL,
  `instruction_text` text,
  `instruction_execution_time_seconds` int(10) DEFAULT NULL,
  `instructions_ingredient_list` binary(16) DEFAULT NULL,
  PRIMARY KEY (`instruction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

*/
    createInstruction(){

    }

    updateInstruction(){

    }

    deleteInstruction(){

    }

    getListInstruction(search_by, order_by, page_number, page_size, limit){

    }

}


