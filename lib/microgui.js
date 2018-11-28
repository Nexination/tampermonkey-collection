class MicroGui {
  constructor(coordinates) {
    this.guiContainer = document.createElement('div');
    this.guiContainer.style = 'position:absolute;top:' + coordinates.y + 'px;left:' + coordinates.x + 'px;min-width:20px;min-height:20px;z-index:1;background-color:rgba(100, 100, 0, 0.6);padding:5px;border-radius:5px;color:white;';

    this.guiContainer.setAttribute('draggable', 'true');
    document.body.appendChild(this.guiContainer);

    this.elementTypes = {"text": "div", "button": "button"};

    this.guiContainer.addEventListener('dragend', (event)=>{this.dragDrop(event);})
  }
  createGui(domList) {
    let htmlText = '';
    for(let i = 0; i < domList.length; i += 1) {
      let domItem = domList[i];
      if(this.elementTypes[domItem.type] !== undefined) {
        htmlText += '<' + this.elementTypes[domItem.type] + '>' + domItem.value + '</' + this.elementTypes[domItem.type] + '>';
        //let domElement = document.createElement(this.elementTypes[domItem.type]);
        //domElement.innerText = domItem.value;
        //this.guiContainer.appendChild(domElement);
      };
    };
    this.guiContainer.innerHTML = htmlText;
  }
  clearGui() {
    this.guiContainer.innerHTML = '';
  }
  dragDrop(dropEvent) {
    let container = dropEvent.srcElement;
    container.style.top = dropEvent.pageY + 'px';
    container.style.left = (dropEvent.pageX-50) + 'px';
  }
};