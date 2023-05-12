// get all recipes 	=> getRecieps 	  /api/recipes
// get  => getRecipeByID  	          /api/recipes/:id    params
// post => createRecipe, 	            /api/recipes        body
// patch => updateRecipeByID,         /api/recipes/:id    body
// delete => deleteRecipeByID,        /api/recipes/:id    params

import express from "express";

import {
  getRecipes,
  getRecipeByID,
  createRecipe,
  updateRecipeByID,
  deleteRecipeByID,
} from "./recipes.js";

const app = express();
const PORT = 3000;

// app.use(express.static("public"));

app.use(express.json());

// get all recipes
app.get("/api/recipes", async (req, res) => {
  const allRecipes = await getRecipes();

  res.send(`success: true, payload: ${allRecipes}`);
});

// get recipe by ID
app.get("/api/recipes/:id", async (req, res) => {
  const recipeId = req.params.id;
  const getRecipe = await getRecipeByID(recipeId);
  res.json(`success: true, payload: ${getRecipe}`);

  // res.send(getRecipe);
  // res.json(getRecipe);
  // console.log(getRecipe);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
