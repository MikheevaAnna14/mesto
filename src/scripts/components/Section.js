export class Section {
    constructor ({ items, renderer }, containerSelector) {
        this._container = document.querySelector(containerSelector);
        //this._items = items;
        this._renderer = renderer;
        this.renderItems(items);
    }

    renderItems(items) {
        items.forEach((item) => {
            this._renderer(item, this._container);  
        });
    }

    addItem(element) {
        this._container.prepend(element)
    }
}
