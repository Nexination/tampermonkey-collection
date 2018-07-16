// ==UserScript==
// @name         Steam Queue Clicker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automatically cycles through queues during sales, to get free cards.
// @author       https://github.com/Nexination
// @match        https://store.steampowered.com/explore/
// @match        https://store.steampowered.com/app/*
// @grant        none
// ==/UserScript==
'use strict';

(function() {

    // Start a new Queue
    let searchForQueueButton = document.getElementById('refresh_queue_btn');
    if(searchForQueueButton !== null) {
        searchForQueueButton.click();
    };

    // Next Queue item
    let searchForNextButton = document.getElementsByClassName('btn_next_in_queue');
    if(searchForNextButton[0] !== null) {
        searchForNextButton[0].click();
    };
})();