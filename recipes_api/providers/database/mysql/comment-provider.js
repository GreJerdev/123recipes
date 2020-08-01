"use strict";

let mysql_provider = require('./database/mysql_provider')();
 

module.exports = class CommentProvider {

    constructor(){

    }
/*
CREATE TABLE `comments` (
  `comment_id` binary(16) NOT NULL,
  `comment_user_id` binary(16) DEFAULT NULL,
  `comment_created_at` datetime DEFAULT NULL,
  `comment_updated_at` datetime DEFAULT NULL,
  `comment_deleted` tinyint(1) DEFAULT NULL,
  `comment_parent` binary(16) DEFAULT NULL,
  `comment_parant_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/
   async createComment(comment, conn = null){
        let is_external_connection = true;
        if (conn == null) {
          conn = await mysql_provider.getConnection();
          is_external_connection = false;
        }
        try {
          let query = `SET @recipe_id = fn_uuid_to_bin(?);
                SET @recipe_name = ?;
                SET @recipe_parent = ?;
                SET @recipe_description = ?;
                SET @recipe_stars = ?;
                
                UPDATE recipes
                SET recipe_id = @recipe_id
                ${update_recipe.name ? ",recipe_parent = @recipe_parent" : ""}
                ${update_recipe.parent ? ",recipe_name = @recipe_name" : ""}
                ${update_recipe.description
              ? ",recipe_description = @recipe_description"
              : ""}
                ${update_recipe.stars ? ",recipe_stars = @recipe_stars" : ""}
                WHERE recipe_id = @recipe_id and recipe_is_deleted = 0 ;
                ;`;
    
          const params = [update_recipe.id, update_recipe.name, update_recipe.parent || null, update_recipe.description, update_recipe.stars];
          await mysql_provider.executeQueryWithConnection(conn, query, params);
          let result = await mysql_provider.executeQueryWithConnection(
            conn,
            this.select_by_id_query,
            [update_recipe.id]
          );
          if (!is_external_connection) {
            mysql_provider.commitTransaction(conn);
          }
          return Promise.resolve(result);
        } catch (err) {
          if (!is_external_connection) {
            mysql_provider.rollbackTransaction(conn);
          }
          console.log(err);
          return Promise.reject(err);
        }
    }

    updateComment(comment,conn = null){
        let is_external_connection = true;
        if (conn == null) {
          conn = await mysql_provider.getConnection();
          is_external_connection = false;
        }
        try {
          let query = `SET @recipe_id = fn_uuid_to_bin(?);
                SET @recipe_name = ?;
                SET @recipe_parent = ?;
                SET @recipe_description = ?;
                SET @recipe_stars = ?;
                
                UPDATE recipes
                SET recipe_id = @recipe_id
                ${update_recipe.name ? ",recipe_parent = @recipe_parent" : ""}
                ${update_recipe.parent ? ",recipe_name = @recipe_name" : ""}
                ${update_recipe.description
              ? ",recipe_description = @recipe_description"
              : ""}
                ${update_recipe.stars ? ",recipe_stars = @recipe_stars" : ""}
                WHERE recipe_id = @recipe_id and recipe_is_deleted = 0 ;
                ;`;
    
          const params = [update_recipe.id, update_recipe.name, update_recipe.parent || null, update_recipe.description, update_recipe.stars];
          await mysql_provider.executeQueryWithConnection(conn, query, params);
          let result = await mysql_provider.executeQueryWithConnection(
            conn,
            this.select_by_id_query,
            [update_recipe.id]
          );
          if (!is_external_connection) {
            mysql_provider.commitTransaction(conn);
          }
          return Promise.resolve(result);
        } catch (err) {
          if (!is_external_connection) {
            mysql_provider.rollbackTransaction(conn);
          }
          console.log(err);
          return Promise.reject(err);
        }
    }

    deleteComment(comment,conn = null){
        let is_external_connection = true;
        if (conn == null) {
          conn = await mysql_provider.getConnection();
          is_external_connection = false;
        }
        try {
          let query = `SET @recipe_id = fn_uuid_to_bin(?);
                SET @recipe_name = ?;
                SET @recipe_parent = ?;
                SET @recipe_description = ?;
                SET @recipe_stars = ?;
                
                UPDATE recipes
                SET recipe_id = @recipe_id
                ${update_recipe.name ? ",recipe_parent = @recipe_parent" : ""}
                ${update_recipe.parent ? ",recipe_name = @recipe_name" : ""}
                ${update_recipe.description
              ? ",recipe_description = @recipe_description"
              : ""}
                ${update_recipe.stars ? ",recipe_stars = @recipe_stars" : ""}
                WHERE recipe_id = @recipe_id and recipe_is_deleted = 0 ;
                ;`;
    
          const params = [update_recipe.id, update_recipe.name, update_recipe.parent || null, update_recipe.description, update_recipe.stars];
          await mysql_provider.executeQueryWithConnection(conn, query, params);
          let result = await mysql_provider.executeQueryWithConnection(
            conn,
            this.select_by_id_query,
            [update_recipe.id]
          );
          if (!is_external_connection) {
            mysql_provider.commitTransaction(conn);
          }
          return Promise.resolve(result);
        } catch (err) {
          if (!is_external_connection) {
            mysql_provider.rollbackTransaction(conn);
          }
          console.log(err);
          return Promise.reject(err);
        }
    }

    getListComment(search_by, order_by, page_number, page_size, limit,conn = null, ){

    }

}


