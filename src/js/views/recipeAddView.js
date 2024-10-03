import { View } from "./view";

class addRecipeView extends View{

    _parentElement = document.querySelector('.upload');
    _btnOpen =  document.querySelector('.nav__btn--add-recipe');
    _btnClose =  document.querySelector('.btn--close-modal');
    _overlay = document.querySelector('.overlay');;
    _window = document.querySelector('.add-recipe-window')

    constructor() {
        super()
        this._addHandlerOpenForm();
        this._addHandlerCLoseForm();
        // this._addHandlerUploadRecipe();
    }

    toggleOverlay(){
        this._overlay.classList.toggle('hidden')
        this._window.classList.toggle('hidden')
    }
    _addHandlerOpenForm(){
        this._btnOpen.addEventListener('click',this.toggleOverlay.bind(this) )
    }
    _addHandlerCLoseForm(){
        this._btnClose.addEventListener('click',this.toggleOverlay.bind(this));  
        this._overlay.addEventListener('click',this.toggleOverlay.bind(this));  
    }

    _addHandlerUploadRecipe(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            const dataArr = [...new FormData(this)]
            const data = Object.fromEntries(dataArr);
            console.log(data);
            handler(data);
        })
    }
}
export default new addRecipeView();