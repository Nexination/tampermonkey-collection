// ==UserScript==
// @name         Tampermonkey Micro Gui
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Allows to make a small lightweight gui for tampermonkey
// @author       https://github.com/Nexination
// ==/UserScript==
class MicroGui {
    constructor(coordinates) {
        this.guiContainer = document.createElement('div');
        this.guiContainer.style = 'position:absolute;top:' + coordinates.y + 'px;left:' + coordinates.x + 'px;min-width:20px;min-height:20px;z-index:1;background-color:rgba(100, 100, 0, 0.6);padding:5px;border-radius:5px;color:white;';

        this.guiContainer.setAttribute('draggable', 'true');
        document.body.appendChild(this.guiContainer);

        this.elementTypes = {"text": "div", "button": "button"};

        this.guiContainer.addEventListener('dragend', (event)=>{this.dragDrop(event);})
    }
    addGui(domList) {
        if(this.settings.clearing) {
            let timer = setTimeout((domList) => {this.addGui(domList);}, 100);
        } else {
            for(let i = 0; i < domList.length; i += 1) {
                let domItem = domList[i];
                if(this.elementTypes[domItem.type] !== undefined) {
                    let tempContent = document.createElement(this.elementTypes[domItem.type]);
                    tempContent.innerHTML = domItem.value;
                    this.guiContainer.appendChild(tempContent);

                    if(domItem.action !== undefined) {
                        tempContent.addEventListener('click', domItem.action);
                    };
                };
            };
        };
    }
    clearGui() {
        let guiChildren = this.guiContainer.children;

        while (this.guiContainer.lastElementChild) {
            this.guiContainer.removeChild(this.guiContainer.lastElementChild);
        };
    }
    dragDrop(dropEvent) {
        let container = dropEvent.srcElement;
        container.style.top = (dropEvent.screenY ? dropEvent.screenY : dropEvent.pageY) + 'px';
        container.style.left = (dropEvent.screenX ? dropEvent.screenX : dropEvent.pageX) + 'px';
    }
};
