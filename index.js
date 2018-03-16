// from https://alligator.io/tooling/puppeteer/

'use strict';

const puppeteer = require('puppeteer');

async function helloWorld() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://en.wikipedia.org/wiki/%22Hello,_World!%22_program');

    const firstPar = await page.$eval('#mw-content-text p', el => el.innerText);

    console.log(firstPar); // A "Hello, World!" program is a computer program that outputs ...

    await browser.close();
}

async function takeScreenshot() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://alligator.io/');

    await page.setViewport({
        width: 1440,
        height: 900
    });

    await page.screenshot({
        fullPage: true,
        path: 'hello-alligator.png'
    });

    await browser.close();
}

async function pdf() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://alligator.io/');

    await page.pdf({
        path: 'hello-alligator.pdf'
    });

    await browser.close();
}

/**
 * Go the Alligator.io’s homepage
 * Place the focus into the search input
 * Wait for 1 second
 * Type-in the word Fancy width a delay of 150ms between keystrokes
 * Wait for the page to have an element with a class of algolia__results
 * Take a screenshot
 */
async function performSearch() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://alligator.io/');

    await page.focus('.algolia__input');
    await page.waitFor(1000);
    await page.type('.algolia__input', 'Fancy', {
        delay: 150
    });

    await page.waitForSelector('.algolia__results');

    await page.screenshot({
        path: 'search.png'
    });
    await browser.close();
}

//helloWorld();
//takeScreenshot();
//pdf();
performSearch();