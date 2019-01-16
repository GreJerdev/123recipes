"use strict";

let mysql_provider = require("./database/mysql_provider")();
let models = require("../models/recipe-model");

module.exports = class RecipeProvider {
  constructor() {
    this.insert_query = `SET @recipe_id = fn_uuid_to_bin(?) ;
SET @recipe_name = ? ;
SET @recipe_parent = ? ;
SET @recipe_description = ? ;

INSERT INTO recipes
(recipe_id,
recipe_parent,
recipe_name,
recipe_description)
VALUES
( 
@recipe_id,
@recipe_parent,
@recipe_name,
@recipe_description
);`;
    this.select_by_id_query = `SET @recipe_id = fn_uuid_to_bin(?);
        select fn_uuid_from_bin(recipe_id) as recipe_id,
        fn_uuid_from_bin(recipe_parent) as recipe_parent,
        recipe_name,
        recipe_description,
        recipe_stars 
        from recipes 
        where recipe_id = @recipe_id  and recipe_is_deleted = 0`;
  }

  async createRecipe(new_recipe, conn = null) {
    let is_external_connection = true;
    if (conn == null) {
      conn = await mysql_provider.getConnection();
      is_external_connection = false;
    }
    try {
      const params = [
        new_recipe.id,
        new_recipe.name,
        new_recipe.parent || null,
        new_recipe.description
      ];
      await mysql_provider.executeQueryWithConnection(
        conn,
        this.insert_query,
        params
      );
      let result = await mysql_provider.executeQueryWithConnection(
        conn,
        this.select_by_id_query,
        [new_recipe.id]
      );
      if (!is_external_connection) {
        mysql_provider.commitTransaction(conn);
      }
      return Promise.resolve(result);
    } catch (err) {
      if (!is_external_connection) {
        mysql_provider.rollbackTransaction(conn);
      }
      logger.log(err);
      return Promise.reject(err);
    }
  }

  async updateRecipe(update_recipe, conn = null) {
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

  async deleteRecipe(recipe_id, conn = null) {
    let is_external_connection = true;
    if (conn == null) {
      conn = await mysql_provider.getConnection();
      is_external_connection = false;
    }
    try {
      let query = `SET @recipe_id = fn_uuid_to_bin(?);
           
            UPDATE recipes
            SET recipe_is_deleted = 1,
            recipe_deleted_at = CURRENT_TIMESTAMP
            WHERE recipe_id = @recipe_id and recipe_is_deleted = 0
            ;`;

      const params = [recipe_id];
      await mysql_provider.executeQueryWithConnection(
        conn,
        this.insert_query,
        params
      );
      let result = await mysql_provider.executeQueryWithConnection(
        conn,
        this.select_by_id_query,
        [new_recipe.id]
      );
      mysql_provider.commitTransaction(conn);
      return Promise.resolve(result);
    } catch (err) {
      if (!is_external_connection) {
        mysql_provider.rollbackTransaction(conn);
      }

      console.log(err);
      return Promise.reject(err);
    }
  }

  async getListRecipe(search_by, order_by, page_number, page_size) {
    try {
      const conn = await mysql_provider.getConnection();
      const first_row = page_number || 0;
      let last_row = 1000;
      if (Number.isInteger(page_size)) {
        first_row = (page_number || 0) * page_size;
        last_row = first_row + page_size;
      }
      const params = [search_by || "", order_by || "recipe_name", first_row, last_row];
      let query = `
            SET @search_by = ?;
            SET @order_by = ?;
            SET @first_row = ?;
            SET @last_row = ?;
            
            select fn_uuid_from_bin(recipe_id) as recipe_id,fn_uuid_from_bin(recipe_parent) as recipe_parent,
            recipe_name,
            recipe_description 
            from recipes
            where (recipe_name like '%@search_by%' 
            OR recipe_description  like '%@search_by%') and recipe_is_deleted = 0 ;
            limit @first_row, @last_row  
            `;

      await mysql_provider.executeQueryWithConnection(conn, this.insert_query, params);
      let result = await mysql_provider.executeQueryWithConnection(
        conn,
        this.select_by_id_query,
        [new_recipe.id]
      );
      mysql_provider.commitTransaction(conn);
      return Promise.resolve(result);
      let result = await getRecipeById(recipe_id, conn);
      return Promise.resolve(result);
    } catch (err) {
      logger.log(err);
      return Promise.reject(err);
    }
  }

  async getRecipeById(recipe_id, conn) {
    let is_external_connection = true;
    try {
      let result = await mysql_provider.execute_query(this.select_by_id_query, [
        recipe_id
      ]);
      if (result.length > 0) {
        return Promise.resolve(result[0]);
      }
      return Promise.reject("Error_Recipe_Not_exist");
    } catch (err) {
      logger.log(err);
      return Promise.reject(err);
    }
  }
};
