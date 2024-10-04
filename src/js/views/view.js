import icons from 'url:../../img/icons.svg';


export class View{

  /**
   * 
   * @param {*} data 
   * @returns 
   */
    render(data) {
        this._data = data;
        if(data.length===0) return this.renderError();
        const markUp = this._generateMarkup();
        this._clear();
        this._parentElement.innerHTML = markUp;
    }

  update(data) {
    this._data = data;
    if (data?.length === 0) return;
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup); //convert html string to dom
    const newElements = Array.from(newDom.querySelectorAll('*')) //creating array of all elements
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (!curEl) return

      //update testcontent
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() != '') {
        curEl.textContent = newEl.textContent;
      }

      //updating attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value)
        })
      }
    })

  }

    _clear() {
        this._parentElement.innerHTML = '';
    }
    rederSpinner() {
        const markUp =
            `<div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
        this._parentElement.innerHTML = '';
        this._parentElement.insertAdjacentHTML('afterbegin', markUp)
    }

    renderError(msg = 'No recipes found for your query. Please try again!') {
        const markUp = `<div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${msg}</p>
      </div>`;
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markUp)

    }
    renderSuccess(succes = 'Start by searching for a recipe or an ingredient. Have fun!') {
        const markUp = `<div class="message">
        <div>
        <svg>
            <use href="${icons}#icon-smile"></use>
        </svg>
        </div>
        <p>${succes}</p>
        </div>`;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markUp)
    }
}