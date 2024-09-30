class SearchRecipeView {
    _parentElement = document.querySelector('.search')
   

    addHandlerRender(handler){
        this._parentElement.addEventListener('submit',function(e){
            e.preventDefault();
            handler();
        })
    }
    clearInput(){
        this._parentElement.querySelector('.search__field').value = '';   
    }

    getQuery(){
        const query =  this._parentElement.querySelector('.search__field').value;
        this.clearInput();
        return query;
    }

}

export default new SearchRecipeView();

