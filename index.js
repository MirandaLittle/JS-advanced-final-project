'use strict';

const cakeRecipes = require("./cake-recipes.json");
const prompt = require("prompt-sync")();


// Your functions here

const uniqueAuthors = (recipeList) => {
  const authorList = [];
  recipeList.forEach(element => {
    if (!authorList.includes(element.Author)) {
      authorList.push(element.Author);
    }
  });
  return authorList
};

const getRecipeNames = (recipeList) => {
  if (recipeList === undefined)
    return "There are no recipes found"
  const recipeMap = recipeList.map(({ Name }) => `${Name}`);
  return recipeMap
};

const filterByAuthor = (recipeList, authorName) => {
  const filteredAuthor = recipeList.filter(recipe => recipe.Author === authorName);
  const recipeNames = filteredAuthor.map(({ Name }) => `${Name}`);
  return recipeNames;
};

const searchIngredient = (recipeList, ingredient) => {
  const filteredIngredient = recipeList.filter(recipe => {
    const recipesSome = recipe.Ingredients.some(ing => ing === ingredient);
    return recipesSome
  });
  const filteredIngredientRecipeName = filteredIngredient.map(recipe => { return recipe.Name });
  return filteredIngredientRecipeName
};

const searchName = (recipeList, recipeName) => {
  const foundRecipe = recipeList.find(({ Name }) => Name.toLowerCase() === recipeName.toLowerCase());
  if (foundRecipe === undefined) {
    return null
  } else {
    return foundRecipe
  };
};

const getIngredientList = (recipeList) => {
  const ingredientArrays = recipeList.map(recipe => { return recipe.Ingredients });
  const flattenedIngredients = ingredientArrays.reduce((acc, currentValue) => acc.concat(currentValue));
  return flattenedIngredients;
};

// console.log(uniqueAuthors(cakeRecipes));
// console.log(getRecipeNames(cakeRecipes));
// console.log(searchIngredient(cakeRecipes, "140g caster sugar"));
// console.log(searchName(cakeRecipes, "Christmas Cupcakes"));
// const shortRecipeList = (filterByAuthor(cakeRecipes, "Miriam Nice"));
// console.log(getIngredientList(shortRecipeList));


// Part 2

const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("6. Get All Recipe Names");
  console.log("0. Exit");
  const choice = prompt("Enter a number (1-6) or 0 to exit: ");
  return parseInt(choice);
}

const savedRecipes = [];

let choice;

do {
  choice = displayMenu();

  switch (choice) {
    case 1: console.log("List of unique authors:", uniqueAuthors(cakeRecipes));

      break;
    case 2: const author = prompt("Enter the name of an author: ");
      const foundRecipes = filterByAuthor(cakeRecipes, author);
      if (foundRecipes.length === 0) {
        console.log("Author not found");
      } else {
        console.log("Found recipes by searched author:", foundRecipes);
      }

      break;
    case 3: const ingredient = prompt("Enter the amount and name of an ingredient: ");
      const foundRecipesIngredient = searchIngredient(cakeRecipes, ingredient)
      if (foundRecipesIngredient.length === 0) {
        console.log("Ingredient not found");
      } else {
        console.log("Found recipes with searched ingredient:", foundRecipesIngredient);
      };
      break;
    case 4: const recipeName = prompt("Enter the name of a recipe: ");
      const foundRecipe = searchName(cakeRecipes, recipeName);
      console.log("Found recipes with searched name:", foundRecipe);
      const save = prompt("Do you want to save the ingredients of this recipe? Y/N: ");
      if (save === "Y") {
        savedRecipes.push(foundRecipe);
      };

      break;
    case 5: console.log("Ingredient list of saved recipes:", getIngredientList(savedRecipes));

      break;
    case 6: console.log("All names of recipes:", getRecipeNames(cakeRecipes));

      break;
    case 0:
      console.log("Exiting...");
      break;
    default:
      console.log("Invalid input. Please enter a number between 0 and 5.");
  }
} while (choice !== 0);



// om het menu te laten zien in terminal "node index.js" runnen