import * as model from './model.js';
import recipeView from './views/recipeView.js';
import SearchRecipeView from './views/searchRecipeView';
import icons from '../img/icons.svg' //parcel1
import icons from 'url:../img/icons.svg';
import 'core-js/stable'; //polyfilling rest
import 'regenerator-runtime/runtime' //polyfilling async await
console.log(icons)


const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//82dc8de4-8a96-46ae-859a-211274fd01c0  api key



const controlRecipes = async function (e) {

  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.rederSpinner();

    await model.loadRecipe(id);

    const recipe = model.state.recipe;

    recipeView.render(model.state.recipe)

    console.log(recipe)
  }
  catch (err) {
    recipeView.renderError(err);
    // alert(err);
  }
}

const controlAllRecipeData = async function () {
  try {
    //getting search key
    const query = searchRecipeView.getQuery();
    //clearing input
    if (!query) return;
    await model.loadSearchRecipes(query)

    const recipes = model.state.searchRecipe.searchRecipeData;
    console.log(recipes)
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  SearchRecipeView.addHandlerRender(controlAllRecipeData);
}
init();
// getRecipe();

