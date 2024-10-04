
import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
import { View } from './view.js';
class RecipeView extends View {
  _data;
  _parentElement = document.querySelector('.recipe');

  addHandlerRender(handler) {
    window.addEventListener('hashchange', handler);
    window.addEventListener('load', handler);
  }

  addHandlerServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;
      const newServing = +btn.dataset.updateserving;
      console.log(newServing);
      if(newServing>0)handler(newServing);
    })

  }

  addHandlerBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.bookMarkRecipe');
      if (!btn) return;
    handler()
     
    })
  }

  _generateMarkup() {
    const recipe = this._data;
    return `<figure class="recipe__fig">
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
            <button class="btn--tiny btn--update-servings" data-updateServing=${recipe?.servings-1}>
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--update-servings" data-updateServing=${recipe?.servings+1}>
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>
    
        <div class="recipe__user-generated ${recipe?.key ? '': 'hidden'}">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round bookMarkRecipe" data-isrecipebookmarked = ${recipe?.bookmarked}>
          <svg class="">
            <use href="${icons}#icon-bookmark${recipe?.bookmarked ?'-fill':''}"></use>
          </svg>
        </button>
      </div>
    
      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
    
        ${recipe?.ingredients.map((ingredient) => this._generateIngredient(ingredient)
    ).join('')}
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

  }

  _generateIngredient(ingredient) {
    return `<li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${ingredient?.quantity ? new Fraction(ingredient?.quantity).toString() : ''}</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ingredient?.unit}</span>
          ${ingredient?.description} 
       </div>
      </li>`;
  }

}

export default new RecipeView();