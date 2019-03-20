"use strict";

let db = require('../mongodb_provider')();
let media = require("../../../models/media-model");

module.exports = class MediaProvider{

    className = MediaProvider;
    constructor(){

    }

    async createMedia(){
        let logPath = `${this.className}/createMedia`;
        logger.info(`${logPath} - start`);
        try{

            logger.info(`${logPath} - end`);
        }catch (err) {

            logger.err(logger.info(`${logPath} - error - ${err}`))
        }

    }

    async updateMedia(){
        let logPath = `${this.className}/updateMedia`;
        logger.info(`${logPath} - start`);
        try{

            logger.info(`${logPath} - end`);
        }catch (err) {

            logger.err(logger.info(`${logPath} - error - ${err}`))
        }
    }

    async deleteMedia(){
        let logPath = `${this.className}/deleteMedia`;
        logger.info(`${logPath} - start`);
        try{

            logger.info(`${logPath} - end`);
        }catch (err) {

            logger.err(logger.info(`${logPath} - error - ${err}`))
        }
    }

    async getListMedia(search_by, order_by, page_number, page_size, limit){
        let logPath = `${this.className}/getListMedia`;
        logger.info(`${logPath} - start`);
        try{

            logger.info(`${logPath} - end`);
        }catch (err) {

            logger.err(logger.info(`${logPath} - error - ${err}`))
        }
    }

}


