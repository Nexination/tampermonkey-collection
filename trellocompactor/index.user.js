// ==UserScript==
// @name         Trello Compactor
// @namespace    http://tampermonkey.net/
// @version      0.25
// @description  Compacts the Trello view and adds some more info.
// @author       https://github.com/Nexination
// @match        https://trello.com/b/*
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @require      https://github.com/Nexination/tampermonkey-collection/raw/master/lib/microgui.js
// ==/UserScript==
//'use strict';

class TrelloCompactor {
  constructor() {
    if (GM_getValue('coordinates') === undefined) {
      GM_setValue('coordinates', {"x": 25, "y": 700});
    };
    let coordinates = GM_getValue('coordinates');

    this.microGui = new MicroGui(coordinates);
    
    let timer = setTimeout(() => {this.delayRun();}, 1500);
    this.indexer();
  }
  delayRun() {
    this.addStyle();
  };
  addStyle() {
    let styleObject = {
      ".js-badges .badge, .list-card-details .list-card-members": {
        "display": "none"
      }
      , ".js-badges .is-due-future, .js-badges .is-due-now, .js-badges .is-due-soon, .js-badges .is-due-past, .js-badges .is-unread-notification": {
        "display": "inline !important"
      }
      , ".js-badges .badge-text": {
        "font-size": "0.7em"
      }
      ,".list-card-details .list-card-labels, .list-card-details .list-card-title": {
        "display": "inline"
        , "font-size": "0.9em"
      }
      ,
    };
    let styleComposite = '';
    for(let i in styleObject) {
      styleComposite += i + '{\n';
      for(let j in styleObject[i]) {
        styleComposite += j + ': ' + styleObject[i][j] + ';\n';
      };
      styleComposite += "}\n";
    };
    GM_addStyle(styleComposite);
  }
  indexer() {
    let cardLists = document.getElementsByClassName('js-list-content');
    let cardCountTotal = 0;
    let uiList = [];

    for(let i = 0; i < cardLists.length; i += 1) {
      let cardList = cardLists[i];
      let cardCount = cardList.getElementsByClassName('list-cards')[0].children.length;
      cardCountTotal += cardCount;

      uiList.push({"type": "text", "value": cardList.getElementsByClassName('list-header-name')[0].value + " (" + cardCount + ")"});
    };
    uiList.push({"type": "text", "value": "Total: " + cardCountTotal});
    this.microGui.clearGui();
    this.microGui.createGui(uiList);

    let timer = setTimeout(() => {this.indexer();}, 10000);
  };
};
let trelloCompactor = new TrelloCompactor();