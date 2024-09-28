
import icons from '../img/icons.svg' //parcel1
import icons from 'url:../img/icons.svg';
import 'core-js/stable'; //polyfilling rest
import 'regenerator-runtime/runtime' //polyfilling async await
console.log(icons)


const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//82dc8de4-8a96-46ae-859a-211274fd01c0  api key

const rederSpinner = function (parentEl) {
  const markUp =
    `<div class="spinner">
  <svg>
    <use href="${icons}#icon-loader"></use>
  </svg>
</div>`;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markUp)
}

const getRecipe = async function (e) {

  try {
    const id = window.location.hash.slice(1);
    if(!id) return;
    rederSpinner(recipeContainer);
    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
    const data = await res.json();
    // if (!res?.ok) throw new Error(`${data?.message} ${data?.status}`)
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


    let markUp = `<figure class="recipe__fig">
    <img src="${recipe?.imageUrl}" alt="${recipe?.title}" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${recipe?.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${recipe?.cookingTIme}</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${recipe?.servings}</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="${icons}#icon-bookmark-fill"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">

    ${recipe?.ingredients.map((ingredient) => {
      return `<li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${ingredient?.quantity}</div>
    <div class="recipe__description">
      <span class="recipe__unit">${ingredient?.unit}</span>
      ${ingredient?.description} 
   </div>
  </li>`}).join('')}
    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${recipe?.publisher}</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${recipe?.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="src/img/icons.svg#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', markUp)
    console.log(recipe)
  }
  catch (err) {
    alert(err);
  }
}

// getRecipe();
window.addEventListener('hashchange',getRecipe);
window.addEventListener('load',getRecipe);
