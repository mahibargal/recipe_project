import { View } from "./view";
import icons from 'url:../../img/icons.svg';


class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');


  _generateMarkup() {
    const numOfPages = Math.ceil(this._data.searchRecipeData.length / this._data.resultPerPage);
    const curPage = this._data.page;


    //page2 ()
    if (curPage === 1 && numOfPages > 1) {

      return `<button class="btn--inline pagination__btn--next" data-gotoPage=${curPage + 1}>
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`
    }

    //page(last)
    if (numOfPages == curPage && numOfPages > 1) {

      return `<button class="btn--inline pagination__btn--prev" data-gotoPage=${curPage - 1}>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>`
    }
    //page3 page 5(middle)
    if (curPage < numOfPages) {
      return `
        <button class="btn--inline pagination__btn--prev" data-gotoPage=${curPage - 1}>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          <button class="btn--inline pagination__btn--next" data-gotoPage=${curPage + 1}>
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`
    }

    //no page
    // if(numOfPages==1 && curPage==1){
    return ''
    // }

  }
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const gotoPage = +btn.dataset.gotopage;
      handler(gotoPage);

      console.log(btn);
      console.log(gotoPage);
    })

  }
}

export default new PaginationView()