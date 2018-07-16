// ==UserScript==
// @name         MultiBuy World Bot
// @namespace    http://tampermonkey.net/
// @version      0.22
// @description  Automatically watches MultiBuy World AD's.
// @author       https://github.com/Nexination
// @match        https://multibuyworld.com
// @match        https://multibuyworld.com/*
// @match        http://multibuyworld.com/*
// @noframes
// @grant        GM_setValue
// @grant        GM_getValue
// @require      https://github.com/Nexination/tampermonkey-collection/raw/master/lib/microgui.js
// ==/UserScript==
'use strict';

(function() {
    if(window.location.pathname === '/') {
        if(GM_getValue('mbwUsername') === undefined) {
          GM_setValue('mbwUsername', '');
          GM_setValue('mbwPassword', '');
        };
        let mbwUsername = GM_getValue('mbwUsername');
        let mbwPassword = GM_getValue('mbwPassword');
        
        let loginForm = document.getElementById('login-form');
        let email = loginForm.elements.loginEmail;
        let password = loginForm.elements.loginPassword;

        if(mbwUsername !== '') {
          email.value = mbwUsername;
          password.value = mbwPassword;

          loginForm.submit();
        };
    } else if(window.location.pathname.search('/dashboard') !== -1) {
        let watchButton = document.getElementById('start-watching');
        if(watchButton.getAttribute("disabled") === null) {
            watchButton.click();
        };
    } else if(window.location.pathname.search('/player') !== -1) {
        class ContainerUnit {
            constructor() {
                this.timerCount = 0;
                this.buttonNext = document.getElementById('player-next-button');
                this.buttonSkip = document.getElementById('player-skip-button');
                this.buttonFinish = document.getElementById('player-finish-button');

                this.adCount = document.getElementById('adsWatched');
                this.adSeconds = document.getElementsByClassName('count next top')[0];

                this.skipCount = 0;

                this.timer = setTimeout(() => {this.foreverLoop();}, 1000);
            }
            foreverLoop() {
                if(this.adSeconds === undefined) {
                    this.adSeconds = document.getElementsByClassName('count next top')[0];
                };

                if(this.buttonFinish.className.search('hidden') === -1) {
                    this.buttonFinish.click();
                };

                let adCount = parseInt(this.adCount.innerText);
                let adSeconds = parseInt(this.adSeconds.innerText);

                this.timerCount += 1;

                if(adSeconds === 0) {
                    if(this.buttonNext.disabled === false) {
                        this.buttonNext.click();
                        this.timerCount = 0;
                        this.skipCount = 0;
                    };
                    if(this.buttonNext.disabled === true && this.timerCount > 25) {
                        this.runSkip();
                    };
                };
                if(adCount < 15) {
                    this.timer = setTimeout(() => {this.foreverLoop();}, 1000);
                } else {
                };
            }
            runSkip() {
                if(this.buttonSkip.disabled === true) {
                    this.buttonSkip.disabled = '';
                };
                if(this.skipCount > 1) {
                    window.location.reload();
                };
                this.skipCount += 1;
                this.buttonSkip.click();
            }
        }
        let containerUnit = new ContainerUnit();
    };
})();
