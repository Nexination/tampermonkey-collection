'use strict';
class MicroGui {
  constructor() {
    this.guiContainer = document.createElement('div');
    this.guiContainer.style = 'position:absolute;top:50px;left:50px;min-width:20px;min-height:20px;z-index:1;background-color:rgba(100, 100, 0, 0.6);padding:5px;border-radius:5px;color:white;';

    this.guiContainer.setAttribute('draggable', 'true');
    document.body.appendChild(this.guiContainer);

    this.elementTypes = {"text": "div", "button": "button"};

    this.guiContainer.addEventListener('dragend', (event)=>{this.dragDrop(event);})
  }
  createGui(domList) {
    for(let i = 0; i < domList.length; i += 1) {
      let domItem = domList[i];
      let domElement = document.createElement(this.elementTypes[domItem.type]);

      domElement.innerText = domItem.value;
      this.guiContainer.appendChild(domElement);
    };
  }
  dragDrop(dropEvent) {
    let container = dropEvent.srcElement;
    container.style.top = dropEvent.pageY + 'px';
    container.style.left = dropEvent.pageX + 'px';
  }
};