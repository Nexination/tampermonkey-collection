// ==UserScript==
// @name         Jira Admin Tools
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Enables a lot of automation inside the Jira admin interface.
// @author       https://github.com/Nexination
// @match        https://admin.atlassian.com/*
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @require      https://github.com/Nexination/tampermonkey-collection/raw/master/lib/microgui.js
// ==/UserScript==
'use strict';

class JiraAdminTools {
    constructor() {
        if (GM_getValue('coordinates') === undefined) {
            GM_setValue('coordinates', {"x": 500, "y": 500});
        };
        let coordinates = GM_getValue('coordinates');

        this.microGui = new MicroGui(coordinates);

        let uiList = [];
        uiList.push({"type": "button", "value": "Do the thing", "action": () => {this.indexer();}});
        this.microGui.addGui(uiList);
    }
    delayRun() {
        this.indexer();
    }
    /*makeGui(uiList) {
        this.microGui.clearGui();
        this.microGui.addGui(uiList);
    }
    stupidOkayButton(buttonClass) {
        console.log(buttonClass);
        console.log(document.getElementsByClassName(buttonClass));
    }*/
    oleLogger() {
        console.log('lay down a log');
    }
    okayRevokes(revokeCardClass) {
        let revokeCards = document.getElementsByClassName(revokeCardClass);//[0].getElementsByTagName('button')[0].click();
        for(let i = 0; i < revokeCards.length; i += 1) {
            let revokeCard = revokeCards[i].getElementsByTagName('button')[0];
            if(revokeCard.innerHTML.toLowerCase() === 'revoke access') {
                revokeCard.click();
            };
        };
    }
    indexer() {
        let tableRows = document.getElementsByTagName('tr');
        let uiList = [];
        for(let i = 1; i < tableRows.length; i += 1) {
            let tempRow = tableRows[i];
            let tempTextDate = tempRow.children[1].innerText;
            let tempDate = new Date(1);
            if(!isNaN(tempTextDate.substr(0,1))) {
                tempDate = new Date(tempTextDate);
            };
            if(tempDate.getFullYear() < 2020) {
                let tempPrompts = tempRow.getElementsByTagName('td')[3]; //Item-z6qfkt-2
                tempPrompts.getElementsByTagName('button')[1].click();
                let tempSubPrompts = tempPrompts.getElementsByTagName('span');
                for(let j = 0; j < tempSubPrompts.length; j += 1) {
                    let tempPrompt = tempSubPrompts[j];
                    if(tempPrompt.innerText.toLowerCase() === 'revoke access') {
                        j = tempSubPrompts.length;
                        tempPrompt.click();
                    };
                };
            };
            this.okayRevokes('css-1yfnrso');// !important
        };
    };
};
let jiraAdminTools = new JiraAdminTools();
