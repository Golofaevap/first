// node actions2/1addNewUser.js
// golofaeva.xs4n@gmail.com
// @e4YGyfB7mpY5h@@
// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const extract = require("extract-zip");
const puppeteer = require("puppeteer-extra");
const fs = require("fs");
const http = require("https"); // or 'https' for https:// URLs

const _ = require("lodash");
const colors = require("colors");
const validator = require("email-validator");

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const getBrowser = require("../../pptFunctions/getBrowser");
const newPage = require("../../pptFunctions/newPage");
const { Console } = require("console");
puppeteer.use(StealthPlugin());

async function main(data, attempt) {
    // const data = {
    //     option: args[2],
    //     newLInk: args[3],
    // };
    const opts = { headless: true, userDataDirPath: "./session", width: 1280, height: 720 };
    const browser = await getBrowser(opts);
    try {
        try {
            const page2 = await newPage(browser, opts);
            await page2.goto(`${data.newLink}`, {
                waitUntil: "networkidle2",
            });
            const url = await page2.url();
            data.newLink = url ? url : data.newLink;
        } catch (error) {
            console.log("broken --------- ", data.newLink);
            
            return -100;
        }
        
        const page = await newPage(browser, opts);
        const campaignIdDraft = data.optionUrl.split("#/deployment/");
        if (campaignIdDraft.length !== 2) {
            console.log("problem with option url", data.optionUrl);
            return;
        }
        const campaignId = campaignIdDraft[1];
        await page.goto(`https://app.fraudfilter.io/#/campaign/${campaignId}`);

        await page.waitForTimeout(3000);
        // const tabContent4 = await page.$("md-tab-content[id='tab-content-4']");
        const tab = await page.waitForSelector("md-tab-item[aria-controls='tab-content-4']");
        await tab.click();
        // input name url ng-model="url.url"
        const tabContent3_1 = await page.$("md-tab-content[id='tab-content-4']");

        await page.waitForTimeout(1000);
        // await page.waitForTimeout(1000);
        // const inputSafe = await page.$("input[name='safePageUrl']");
        // await inputSafe.type(data.safePage, { delay: 25 });
        const inputSafe = await page.$("input[name='safePageUrl']");
        await inputSafe.click({ clickCount: 3 });
        console.log(data.newLink);
        await inputSafe.type(data.newLink, { delay: 25 });

        // button ng-click="$ctrl.integration = true"
        await page.waitForTimeout(1000);
        const saveButton = await page.$("button[ng-click='$ctrl.integration = true']");
        await saveButton.click();
        await page.waitForTimeout(2000);

        return 100;
    } catch (error) {
        console.error(error);
        return attempt + 1;
    } finally {
        await browser.close();
    }
}

async function start() {
    const datas = require("./safeChangeCurrent.json");
    console.log(datas.length);
    for (let i in datas) {
        let attempt = 0;
        while (attempt < 5 && attempt > -50) {
            attempt = await main(datas[i], attempt);
        }
    }
}
start();
