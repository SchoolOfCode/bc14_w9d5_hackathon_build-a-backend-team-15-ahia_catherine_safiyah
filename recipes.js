/*
PLAN

npm i - dependencies
npm install express
npm install nodemon --dev
npm install uuidv4

write one function, test it works.

READ 
PARSE 
MODIFY 
STRINGIFY 
WRITE
*/

import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const fileName = "recipes.json";

// GET ALL RECIPES
export async function getRecipes() {
  // READ
  const allRecipesJSON = await fs.readFile(fileName);

  // PARSE
  const allRecipes = JSON.parse(allRecipesJSON);

  // RETURN
  return allRecipes;
}

// GET A RECIPE BY ID
export async function getRecipeByID(id) {
  // READ
  const allRecipesJSON = await fs.readFile(fileName);
  // PARSE
  const allRecipes = JSON.parse(allRecipesJSON);

  let recipe = null;

  // RETURN
  for (let i = 0; i < allRecipes.length; i++) {
    if (allRecipes[i].id === id) {
      recipe = allRecipes[i];
      return recipe;
    } else {
      return recipe;
    }
  }
}

// getRecipeByID("4c848d48-b81e-4d6f-b45d-7b3090f4f"); - returns null.

// CREATE A RECIPE
export async function createRecipe(newRecipe) {
  // READ
  const allRecipesJSON = await fs.readFile(fileName);
  // PARSE
  const allRecipes = JSON.parse(allRecipesJSON);
  // MODIFY
  const recipeToBeAdded = {
    id: uuidv4(),
    title: newRecipe.title,
    ingredients: newRecipe.ingredients,
    instructions: newRecipe.instructions,
    image: newRecipe.image,
  };

  allRecipes.push(recipeToBeAdded);

  // STRINGIFY & WRITE
  await fs.writeFile(fileName, JSON.stringify(allRecipes), "utf8");

  return recipeToBeAdded;
}

//TESTING createRecipe function

// createRecipe({
//   id: "2",
//   title: "Burger",
//   ingredients: ["15g of beans", "15g of butter", "15g of toast"],
//   instructions:
//     "Put butter in your mouth, wait 2 seconds to allow slight melting. Then follow with the toast. Swish around for 10-15 seconds to allow even coating of butter on the toast. Then add the beans, slowly.\n  \n    Season to taste.",
//   image:
//     "https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-4-500x375.jpg",
// });//

// UPDATE A RECIPE BY ID
export async function updateRecipeByID(id, updatedRecipe) {
  // READ
  const allRecipesJSON = await fs.readFile(fileName);
  // PARSE
  const allRecipes = JSON.parse(allRecipesJSON);
  // MODIFY

  // here we're creating a variable so that the recipetobeupdated is null
  let recipeToBeUpdated = null;
  // here were checking what is happening before the for loop

  // now we are looping through allrecipes arrray
  for (let i = 0; i < allRecipes.length; i++) {
    //finding matching ID
    if (allRecipes[i].id === id) {
      recipeToBeUpdated = {
        id: allRecipes[i].id,
        title: updatedRecipe.title,
        ingredients: updatedRecipe.ingredients,
        instructions: updatedRecipe.instructions,
        image: updatedRecipe.image,
      };
      //console.log (recipeToBeUpdated);
      allRecipes.splice(i, 1, recipeToBeUpdated);

      console.log(allRecipes);

      break;
    }
    // STRINGIFY
  }
  await fs.writeFile(fileName, JSON.stringify(allRecipes), "utf8");
  //console.log(recipeToBeUpdated);
}

/*updateRecipeByID("f90ba301-e28c-4d18-8eb8-41cad552dfbd", {
  title: "pasta",
  ingredients: ["15g of mash", "15g of butter", "15g of toast"],
  instructions:
    "Put butter in your mouth, wait 2 seconds to allow slight melting. Then follow with the toast. Swish around for 10-15 seconds to allow even coating of butter on the toast. Then add the beans, slowly.\n  \n    Season to taste.",
  image:
    "https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-4-500x375.jpg",
});*/

// WRITE

// DELETE A RECIPE BY ID
export async function deleteRecipeByID(id) {
  // READ
  const allRecipesJSON = await fs.readFile(fileName);
  // PARSE
  const allRecipes = JSON.parse(allRecipesJSON);

  // MODIFY
  let recipeIndex = null;
  for (let i = 0; i < allRecipes.length; i++) {
    if (allRecipes[i].id === id) {
      recipeIndex = i;
      break;
    }
  }
  if (recipeIndex !== null) {
    const deletedRecipe = allRecipes.splice(recipeIndex, 1);
    //STRINGIFY
    await fs.writeFile(fileName, JSON.stringify(allRecipes));
    return deletedRecipe[0];
  }
  return recipeIndex;
}

//deleteRecipeByID("4c848d48-b81e-4d6f-b45d-7b3090f4f8ef");
