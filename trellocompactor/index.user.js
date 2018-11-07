// ==UserScript==
// @name         Trello Compactor
// @namespace    http://tampermonkey.net/
// @version      0.24
// @description  Compacts the Trello view and adds some more info.
// @author       https://github.com/Nexination
// @match        https://trello.com/b/*
// @grant        GM_addStyle
// @require      https://github.com/Nexination/tampermonkey-collection/raw/master/lib/microgui.js
// ==/UserScript==
'use strict';

(function() {
  let microGui = new MicroGui();
  let indexer = function() {
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
    microGui.clearGui();
    microGui.createGui(uiList);

    let timer = setTimeout(() => {indexer();}, 10000);
  };
  let delayRun = function() {
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

    indexer();
  };

  let timer = setTimeout(() => {delayRun();}, 1500);
})();