export class Section {
    constructor (renderer, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
        }

    renderItems(items, userId) {  /// добавили userId  
        items.forEach(item => { 
            this._renderer(item, userId);  /// добавили userId  
        })
    }

    addItem(element) {
        this._container.prepend(element)
    }
}
