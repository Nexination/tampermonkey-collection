// ==UserScript==
// @name         Tampermonkey Micro Gui
// @namespace    http://tampermonkey.net/
// @version      0.1
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
        //let htmlText = '';
        for(let i = 0; i < domList.length; i += 1) {
            let domItem = domList[i];
            if(this.elementTypes[domItem.type] !== undefined) {
                let tempContent = document.createElement(this.elementTypes[domItem.type]);
                tempContent.innerHTML = domItem.value;
                //tempContent.innerHtml = domItem.value;
                //console.log(tempContent);

                this.guiContainer.appendChild(tempContent);

                if(domItem.action !== undefined) {
                    tempContent.addEventListener('click', domItem.action);
                };
                //htmlText += '<' + this.elementTypes[domItem.type] + tempAction + '>' + domItem.value + '</' + this.elementTypes[domItem.type] + '>';
                //let domElement = document.createElement(this.elementTypes[domItem.type]);
                //domElement.innerText = domItem.value;
                //this.guiContainer.appendChild(domElement);
            };
        };
        //this.guiContainer.innerHTML += htmlText;
    }
    clearGui() {
        let guiChildren = this.guiContainer.children;
        for(let i = 0; i < guiChildren.length; i += 1) {
            console.log(guiChildren[i]);
            guiChildren[i].remove();
        };
        //this.guiContainer.innerHTML = '';
    }
    dragDrop(dropEvent) {
        let container = dropEvent.srcElement;
        container.style.top = (dropEvent.screenY ? dropEvent.screenY : dropEvent.pageY) + 'px';
        container.style.left = (dropEvent.screenX ? dropEvent.screenX : dropEvent.pageX) + 'px';
    }
};
