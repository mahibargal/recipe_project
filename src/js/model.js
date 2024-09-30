//module 
import { async } from 'regenerator-runtime';
import {API_URL} from './config.js';
import { getJSON } from './helper.js';
export const state = {
    recipe: {},
    searchRecipe: {
        query: '',
        searchRecipeData: []
    }
}

export const loadRecipe = async function (id) {
    try {
        
        const data = await getJSON(id);
        let { recipe } = data?.data;
        recipe = {
            id: recipe?.id,
            publisher: recipe?.publisher,
            title: recipe?.title,
            servings: recipe?.servings,
            ingredients: recipe?.ingredients,
            imageUrl: recipe?.image_url,
            sourceUrl: recipe?.source_url,
            cookingTIme: recipe?.cooking_time
        }
        state.recipe = recipe;
        console.log(state.recipe);
    } catch (err) {
        throw err;
        alert(`${err} my error`);
    }
}

export const loadSearchRecipes = async function(query){
    try{
        const data = await getJSON(`?search=${query}`);
      const recipesData =  data?.data?.recipes.map(recipe=>{
        return {
            id: recipe?.id,
            imageUrl: recipe?.image_url,
            publisher: recipe?.publisher,
            title: recipe?.title
        }
       })
       state.searchRecipe.searchRecipeData = recipesData;

    }catch(err){
        throw err;
        console.error(err);
    }

}

