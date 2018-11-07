'use strict';
class MicroGui {
  constructor() {
    this.guiContainer = document.createElement('div');
    this.guiContainer.style = 'position:absolute;bottom:1px;left:75%;min-width:20px;min-height:20px;z-index:1;background-color:rgba(100, 100, 0, 0.6);padding:5px;border-radius:5px;color:white;';
    document.body.appendChild(this.guiContainer);

    this.elementTypes = {"text": "div", "button": "button"};
  }
  createGui(domList) {
    for(let i = 0; i < domList.length; i += 1) {
      let domItem = domList[i];
      let domElement = document.createElement(this.elementTypes[domItem.type]);

      domElement.innerText = domItem.value;
      this.guiContainer.appendChild(domElement);
    };
  }
};