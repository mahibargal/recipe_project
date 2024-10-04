//module 
import { start } from 'repl';
import {API_URL,RES_PER_PAGE,KEY} from './config.js';
import { getJSON,sendJSON } from './helper.js';
export const state = {
    recipe: {},
    searchRecipe: {
        query: '',
        searchRecipeData: [],
        resultPerPage:RES_PER_PAGE,
        page:1

    },
    bookMarks: [],
}

const createRecipeObject = function(recipe){
   return  {
        id: recipe?.id,
        publisher: recipe?.publisher,
        title: recipe?.title,
        servings: recipe?.servings,
        ingredients: recipe?.ingredients,
        imageUrl: recipe?.image_url,
        sourceUrl: recipe?.source_url,
        cookingTIme: recipe?.cooking_time,
       ...(recipe?.key && {key:recipe?.key})
    }
}

export const loadRecipe = async function (id) {
    try {
        const url = `${API_URL}${id}?key=${KEY}`
        const data = await getJSON(url);
        let { recipe } = data?.data;
        recipe = createRecipeObject(recipe);
        state.recipe = recipe;

        //checking for recipe bookmark
        if(state?.bookMarks?.some(bookmark=>bookmark.id == id))
         state.recipe.bookmarked= true;
         else state.recipe.bookmarked= false;

        console.log(state.recipe);
    } catch (err) {
        throw err;
        alert(`${err} my error`);
    }
}

export const loadSearchRecipes = async function(query){
    try{
        const url = `${API_URL}`;
        const data = await getJSON(`${url}?search=${query}&key=${KEY}`);
      const recipesData =  data?.data?.recipes.map(recipe=>{
        return {
            id: recipe?.id,
            imageUrl: recipe?.image_url,
            publisher: recipe?.publisher,
            title: recipe?.title,
            key:recipe?.key
        }
       })
       state.searchRecipe.page = 1;//reset page to one when we search
       state.searchRecipe.searchRecipeData = recipesData;

    }catch(err){
        throw err;
        console.error(err);
    }
}

export const getPageRecipeData = function (page= state.searchRecipe.page) {
    state.searchRecipe.page = page;
    const stratIndex = (page - 1) * RES_PER_PAGE
    const endIndex = page * RES_PER_PAGE;
    return state.searchRecipe.searchRecipeData.slice(stratIndex, endIndex);
}

export const modifyServing = function (newServing) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = ing.quantity * newServing / state.recipe.servings;
    })
    state.recipe.servings = newServing
}

const storeBookMarksInLocalStorage = function(){
    localStorage.setItem('bookmarks',JSON.stringify(state.bookMarks))
}

export const addBookMark = function(recipe){
    //add bppkmarke
    state.bookMarks.push(recipe);
    //mrk current recipe as bookmark
    if(recipe.id == state.recipe.id) state.recipe.bookmarked = true;
    storeBookMarksInLocalStorage();
}

export const deleteBookMark = function(id){
   const index =  state.bookMarks.findIndex((bookmark=>bookmark?.id == id));
    console.log(index);
    state.bookMarks.splice(index,1);
    if(id == state.recipe.id) state.recipe.bookmarked = false;
    storeBookMarksInLocalStorage();

}

export const addRecipe = async function (newRecipe) {
    console.log(newRecipe);
    try {
        const ingredients = Object.entries(newRecipe).filter((elm) => elm[0].startsWith('ingredient') && elm[1] != '').map((ing) => {
            // const ingArr = ing[1].replaceAll(' ', '').split(',');
            const ingArr = ing[1].split(',').map((elm=>elm.trim()));
            if (ingArr.length != 3) throw new Error('Wrong ingredient format!, Please use the correct format')
            const [quantity, unit, description] = ingArr
            return { quantity: quantity ? +quantity : null, unit, description };
        })
        console.log(ingredients);

        const recipeDataTosend = {
            publisher: newRecipe?.publisher,
            title: newRecipe?.title,
            servings: +newRecipe?.servings,
            ingredients: ingredients,
            image_url: newRecipe?.image,
            source_url: newRecipe?.sourceUrl,
            cooking_time: +newRecipe?.cookingTime
        }

        const data = await sendJSON(`${API_URL}?key=${KEY}`,recipeDataTosend);
        console.log(data);
        let { recipe } = data?.data;
       const newRecipeData=  createRecipeObject(recipe);
       state.recipe = newRecipeData;
       addBookMark(state.recipe);

    }
    catch (err) {
        throw err;
    }
}

const init = function () {
    const bookmarks = localStorage.getItem('bookmarks');
    if(bookmarks)state.bookMarks = JSON.parse(bookmarks);

    console.log(bookmarks)
}

init();


