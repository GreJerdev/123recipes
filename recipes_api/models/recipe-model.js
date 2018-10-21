"use strict";


module.exports = class Recipe {

    constructor(recipe) {
        if (recipe) {
            this.id = recipe.id || "";
            this.parent = recipe.parent || "";
            this.name = recipe.name || "";
            this.description = recipe.description || "";
        } else {
            this.id = "";
            this.parent = "";
            this.name = "";
            this.description = "";
        }
    }
}
