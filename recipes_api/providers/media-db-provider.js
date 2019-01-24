"use strict";
let mysql_provider = require('./database/mysql_provider')();

module.exports = class MediaProvider{

    className = MediaProvider;
    constructor(){

    }

    createMedia(){
        let logPath = `${this.className}/createMedia`;
        logger.info(`${logPath} - start`);
        try{

            logger.info(`${logPath} - end`);
        }catch (err) {

            logger.err(logger.info(`${logPath} - error - ${err}`))
        }

    }

    updateMedia(){
        let logPath = `${this.className}/updateMedia`;
        logger.info(`${logPath} - start`);
        try{

            logger.info(`${logPath} - end`);
        }catch (err) {

            logger.err(logger.info(`${logPath} - error - ${err}`))
        }
    }

    deleteMedia(){
        let logPath = `${this.className}/deleteMedia`;
        logger.info(`${logPath} - start`);
        try{

            logger.info(`${logPath} - end`);
        }catch (err) {

            logger.err(logger.info(`${logPath} - error - ${err}`))
        }
    }

    getListMedia(search_by, order_by, page_number, page_size, limit){
        let logPath = `${this.className}/getListMedia`;
        logger.info(`${logPath} - start`);
        try{

            logger.info(`${logPath} - end`);
        }catch (err) {

            logger.err(logger.info(`${logPath} - error - ${err}`))
        }
    }

}


