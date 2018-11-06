"use strict";


module.exports = class Recipe {

    constructor(recipe) {
        if (recipe) {
            this.id = recipe.id || "";
            this.parent = recipe.parent || null;
            this.name = recipe.name || "";
            this.description = recipe.description || "";
        } else {
            this.id = "";
            this.parent = "";
            this.name = "";
            this.description = "";
        }
    }

    parseFromDB(row){
         let recipe = new Recipe();
         if(row){
            recipe.id = row['recipe_id'];
            recipe.parent = row['recipe_parent'] || null;
            recipe.name = row['recipe_name'] || '';
            recipe.description = row['recipe_description'] || '';
         }
         return recipe;
    }
}
