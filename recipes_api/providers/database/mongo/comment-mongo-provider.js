"use strict";

let db = require('../mongodb_provider')();
let Comment = require("../../../models/comment-model");

module.exports = class CommentProvider {

    constructor(){

    }

    async createComment(comment, conn = null){
        try {
          return Promise.resolve(result);
        } catch (err) {
          console.log(err);
          return Promise.reject(err);
        }
    }

    async updateComment(comment,conn = null){
        try {
          return Promise.resolve(result);
        } catch (err) {
          console.log(err);
          return Promise.reject(err);
        }
    }

    async deleteComment(comment,conn = null){
        try {
          return Promise.resolve(result);
        } catch (err) {
          console.log(err);
          return Promise.reject(err);
        }
    }

    getListComment(search_by, order_by, page_number, page_size, limit,conn = null, ){

    }

}


