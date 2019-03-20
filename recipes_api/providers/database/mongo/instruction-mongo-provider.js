"use strict";

let db = require('../mongodb_provider')();
let Instruction = require("../../../models/instruction-model");

module.exports = class InstructionProvider{

    constructor(){

    }

    async createInstruction(){
        let log_path = 'InstructionProvider/createInstruction -';
        try {
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async updateInstruction(){
        let log_path = 'InstructionProvider/updateInstruction -';
        try {
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async deleteInstruction(){
        let log_path = 'InstructionProvider/deleteInstruction -';
        try {
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async getListInstruction(search_by, order_by, page_number, page_size, limit){
        let log_path = 'InstructionProvider/getListInstruction -';
        try {
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

}


