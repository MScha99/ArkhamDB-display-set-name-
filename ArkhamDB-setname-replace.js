// ==UserScript==
// @name         Replace ArkhamDB scenario pack with set name
// @namespace    http://tampermonkey.net/
// @version      04.05.2025
// @description  Script that replaces scenario pack names with corresponding set names, for those that bought them in the new formula/in one go. Works on card-detail page ex: /card/06279
// @author       mscha99
// @match        https://arkhamdb.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // Mapping: subset -> set name
const subsetToSet = {


    // The Dunwich Legacy
    "The Dunwich Legacy": "The Dunwich Legacy",
    "The Miskatonic Museum": "The Dunwich Legacy",
    "The Essex County Express": "The Dunwich Legacy",
    "Blood on the Altar": "The Dunwich Legacy",
    "Undimensioned and Unseen": "The Dunwich Legacy",
    "Where Doom Awaits": "The Dunwich Legacy",
    "Lost in Time and Space": "The Dunwich Legacy",

    // The Path to Carcosa
    "The Path to Carcosa": "The Path to Carcosa",
    "Echoes of the Past": "The Path to Carcosa",
    "The Unspeakable Oath": "The Path to Carcosa",
    "A Phantom of Truth": "The Path to Carcosa",
    "The Pallid Mask": "The Path to Carcosa",
    "Black Stars Rise": "The Path to Carcosa",
    "Dim Carcosa": "The Path to Carcosa",

    // The Forgotten Age
    "The Forgotten Age": "The Forgotten Age",
    "Threads of Fate": "The Forgotten Age",
    "The Boundary Beyond": "The Forgotten Age",
    "Heart of the Elders": "The Forgotten Age",
    "The City of Archives": "The Forgotten Age",
    "The Depths of Yoth": "The Forgotten Age",
    "Shattered Aeons": "The Forgotten Age",

    // The Circle Undone
    "The Circle Undone": "The Circle Undone",
    "The Secret Name": "The Circle Undone",
    "The Wages of Sin": "The Circle Undone",
    "For the Greater Good": "The Circle Undone",
    "Union and Disillusion": "The Circle Undone",
    "In the Clutches of Chaos": "The Circle Undone",
    "Before the Black Throne": "The Circle Undone",

    // The Dream-Eaters
    "The Dream-Eaters": "The Dream-Eaters",
    "The Search for Kadath": "The Dream-Eaters",
    "A Thousand Shapes of Horror": "The Dream-Eaters",
    "Dark Side of the Moon": "The Dream-Eaters",
    "Point of No Return": "The Dream-Eaters",
    "Where the Gods Dwell": "The Dream-Eaters",
    "Weaver of the Cosmos": "The Dream-Eaters",

    // The Innsmouth Conspiracy
    "The Innsmouth Conspiracy": "The Innsmouth Conspiracy",
    "In Too Deep": "The Innsmouth Conspiracy",
    "Devil Reef": "The Innsmouth Conspiracy",
    "Horror in High Gear": "The Innsmouth Conspiracy",
    "A Light in the Fog": "The Innsmouth Conspiracy",
    "The Lair of Dagon": "The Innsmouth Conspiracy",
    "Into the Maelstrom": "The Innsmouth Conspiracy",



    // Investigator Starter Decks
    "Nathaniel Cho": "Nathaniel Cho Starter Decks",
    "Harvey Walters": "Harvey Walters Starter Decks",
    "Winifred Habbamock": "Winifred Habbamock Starter Decks",
    "Jacqueline Fine": "Jacqueline Fine Starter Decks",
    "Stella Clark": "Stella Clark Starter Decks",

    // Side Stories
    "Curse of the Rougarou": "Side Stories",
    "Carnevale of Horrors": "Side Stories",
    "The Labyrinths of Lunacy": "Side Stories",
    "Guardians of the Abyss": "Side Stories",
    "Murder at the Excelsior Hotel": "Side Stories",
    "The Blob That Ate Everything": "Side Stories",
    "War of the Outer Gods": "Side Stories",
    "Machinations Through Time": "Side Stories",
    "Fortune and Folly": "Side Stories",
    "The Blob That Ate Everything ELSE!": "Side Stories",
    "The Midwinter Gala": "Side Stories",

    // Promotional (Books, etc.)
    "Hour of the Huntress": "Promotional",
    "The Dirge of Reason": "Promotional",
    "Ire of the Void": "Promotional",
    "The Deep Gate": "Promotional",
    "To Fight the Black Wind": "Promotional",
    "Blood of Baalshandor": "Promotional",
    "Dark Revelations": "Promotional",
    "Promo": "Promotional",

    // Parallel/Standalone Print-and-Play
    "Read or Die": "Parallel",
    "All or Nothing": "Parallel",
    "Bad Blood": "Parallel",
    "By the Book": "Parallel",
    "Red Tide Rising": "Parallel",
    "On the Road Again": "Parallel",
    "Laid to Rest": "Parallel",
    "Path of the Righteous": "Parallel",
    "Relics of the Past": "Parallel",
    "Hunting for Answers": "Parallel",
    "Pistols and Pearls": "Parallel",
    "Aura of Faith": "Parallel",
};

    function waitForElement(selector, callback, timeout = 10000) {
        const start = Date.now();
        const interval = setInterval(() => {
            const el = document.querySelector(selector);
            if (el) {
                clearInterval(interval);
                callback(el);
            } else if (Date.now() - start > timeout) {
                clearInterval(interval);
                console.warn("Timeout: Element not found:", selector);
            }
        }, 200);
    }

    waitForElement("ul.pager", (pager) => {
        const items = pager.querySelectorAll("li");
        if (items.length >= 2) {
            const anchor = items[1].querySelector("a");
            const subsetName = anchor?.textContent?.trim();
            const setName = subsetToSet[subsetName];
            if (setName) {
                items[1].innerHTML = `<span style="font-weight: bold; color: purple;">${setName}</span>`;
            } else {
                console.warn("No mapping found for:", subsetName);
            }
        }
    });

})();
