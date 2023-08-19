class Recipe:
    def __init__(self, recipe=None):
        if recipe:
            self.id = recipe.get('id', "")
            self.parent = recipe.get('parent', None)
            self.name = recipe.get('name', "")
            self.description = recipe.get('description', "")
            self.stars = recipe.get('stars', 0)
        else:
            self.id = ""
            self.parent = None
            self.name = ""
            self.description = ""
            self.stars = 0

    @classmethod
    def parse_from_db(cls, row):
        recipe = cls()
        if row:
            recipe.id = row.get('recipe_id', "")
            recipe.parent = row.get('recipe_parent', None)
            recipe.name = row.get('recipe_name', "")
            recipe.description = row.get('recipe_description', "")
            recipe.stars = row.get('recipe_stars', 0)
        return recipe