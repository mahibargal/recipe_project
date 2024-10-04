import * as model from './model.js';
import recipeView from './views/recipeView.js';
import SearchRecipeView from './views/searchRecipeView.js'
import icons from '../img/icons.svg' //parcel1
import icons from 'url:../img/icons.svg';
import 'core-js/stable'; //polyfilling rest
import 'regenerator-runtime/runtime' //polyfilling async await
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookMarkView from './views/bookMarkView.js';
import addRecipeView from './views/recipeAddView';
import recipeAddView from './views/recipeAddView';
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
    //update results view to mark selected search result
    resultsView.update(model.getPageRecipeData());
    await model.loadRecipe(id);

    const recipe = model.state.recipe;

    recipeView.render(model.state.recipe)
    console.log(recipe)

    bookMarkView.update(model.state.bookMarks)
  }
  catch (err) {
    recipeView.renderError(err);
    // alert(err);
  }
}

const controlSearchRecipeData = async function () {
  try {
    //getting search key
    const query = SearchRecipeView.getQuery();
    //clearing input
    if (!query) return;
    resultsView.rederSpinner();
    await model.loadSearchRecipes(query);

    const recipes = model.getPageRecipeData();
    resultsView.render(recipes);

    //render Pagination
    paginationView.render(model.state.searchRecipe);

  } catch (err) {
    console.log(err);
    throw err;
  }
}

const controlPagination = function (gotoPage) {
  const recipes = model.getPageRecipeData(gotoPage);
  resultsView.render(recipes);

  paginationView.render(model.state.searchRecipe);
}
const controlRecipeServing = function (newServing) {

  model.modifyServing(newServing);
  const recipe = model.state.recipe;
  // recipeView.render(model.state.recipe)
  recipeView.update(recipe);

}

const controlAddBookmark = function(){
  model.state.recipe.bookmarked ? model.deleteBookMark(model.state.recipe.id):  model.addBookMark(model.state.recipe); 
  recipeView.update(model.state.recipe)
  bookMarkView.render(model.state.bookMarks)
}

const loadBookmarksandShow = function(){
  //pageloads check localstorage bookmarks and add on UI.
  bookMarkView.render(model.state.bookMarks)
}

const controlAddRecipe = async function (recipe) {
  try {
    addRecipeView.rederSpinner();
    await model.addRecipe(recipe);

    addRecipeView.renderSuccess();
    recipeView.render(model.state.recipe);
    bookMarkView.render(model.state.bookMarks);
    window.history.pushState(null,'',`#${model.state?.recipe?.id}`)

    setTimeout(() => {
      addRecipeView.toggleOverlay()
    }, 2000);
    console.log(model.state.recipe);

  } catch (err) {
    recipeAddView.renderError(err);
  }
  // console.log(recipe);
}

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerServings(controlRecipeServing)
  SearchRecipeView.addHandlerRender(controlSearchRecipeData);
  paginationView.addHandlerClick(controlPagination)
  recipeView.addHandlerBookmark(controlAddBookmark);
  bookMarkView.addHandlerBookMark(loadBookmarksandShow);
  addRecipeView._addHandlerUploadRecipe(controlAddRecipe);
}
init();
