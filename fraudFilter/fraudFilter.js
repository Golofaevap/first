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
const getBrowser = require("../pptFunctions/getBrowser");
const newPage = require("../pptFunctions/newPage");
const { Console } = require("console");
puppeteer.use(StealthPlugin());

async function main() {
    const args = process.argv;
    console.log(args);
    // const data = {
    //     name: "123",
    //     moneyPage: "https://yandex.ru",
    //     safePage: "https://google.com",
    //     country: "italy",
    // };
    const data = {
        name: args[2],
        moneyPage: args[3],
        safePage: args[4],
        country: args[5],
    };
    data.name = data.name.replace(/[^a-zA-Z0-9]/g, "");
    const opts = { headless: false, userDataDirPath: "./session", width: 1280, height: 720 };
    const browser = await getBrowser(opts);

    const page = await newPage(browser, opts);

    await page.goto("https://app.fraudfilter.io/#/campaign/new");
    await page.waitForTimeout(3000);

    const tabContent2 = await page.$("md-tab-content[id='tab-content-2']");

    const title = await tabContent2.$("input[name='title']");
    await title.type(data.name, { delay: 40 });

    await page.waitForTimeout(1000);
    const platformSelector = await tabContent2.$("md-select[name='ts']");
    await platformSelector.click();

    await page.waitForTimeout(1000);
    const googleAds = await page.$("md-option[value='5664902681198592']");
    await googleAds.click();

    // md-radio-button
    await page.waitForTimeout(1000);
    const campaignStatus = await tabContent2.$("md-radio-button[value='ACTIVE']");
    await campaignStatus.click();

    // button aria-label="next tab"
    await page.waitForTimeout(1000);
    const nextButtonPage1 = await page.$("button[aria-label='next tab']");
    await nextButtonPage1.click();

    // ***************************************
    // second page
    // ***************************************
    const tabContent3 = await page.$("md-tab-content[id='tab-content-3']");

    // md-switch  aria-label="Append url query"
    await page.waitForTimeout(5000);
    const appendQuery = await tabContent3.$("md-switch[aria-label='Append url query']");
    await appendQuery.click();

    // input name url ng-model="url.url"
    await page.waitForTimeout(1000);
    const inputMoney = await tabContent3.$("input[name='url']");
    await inputMoney.type(data.moneyPage, { delay: 25 });

    // input aria-label="Weight"
    await page.waitForTimeout(1000);
    const inputWeight = await tabContent3.$("input[aria-label='Weight']");
    await inputWeight.click({ clickCount: 3 });
    await inputWeight.type("100", { delay: 25 });

    // button aria-label="next tab"
    await page.waitForTimeout(1000);
    const nextButtonPage2 = await page.$("button[aria-label='next tab']");
    await nextButtonPage2.click();

    // ***************************************
    // third page
    // ***************************************

    // md-checkbox  aria-label="url"
    await page.waitForTimeout(5000);
    // md-tab-content id="tab-content-4"

    const tabContent4 = await page.$("md-tab-content[id='tab-content-4']");

    // const safeUrlCheck = await page.$("md-checkbox[aria-label='url'][type='checkbox']");
    const safeUrlCheck = await tabContent4.$("md-checkbox");
    await safeUrlCheck.click();

    // input name="safePageUrl"
    await page.waitForTimeout(1000);
    const inputSafe = await page.$("input[name='safePageUrl']");
    await inputSafe.type(data.safePage, { delay: 25 });

    // button aria-label="next tab"
    await page.waitForTimeout(1000);
    const nextButtonPage3 = await page.$("button[aria-label='next tab']");
    await nextButtonPage3.click();

    // ***************************************
    // fourth page
    // ***************************************

    // md-checkbox  aria-label="url"
    await page.waitForTimeout(5000);
    // md-tab-content id="tab-content-4"

    const tabContent5 = await page.$("md-tab-content[id='tab-content-5']");

    // button aria-label="Open some menu"
    await page.waitForTimeout(1000);
    const openMenuCondition = await tabContent5.$("button[aria-label='Open some menu']");
    await openMenuCondition.click();

    // button aria-label="Country"

    await page.waitForTimeout(1000);
    const selectCountry = await page.$("button[aria-label='Country']"); // page
    await selectCountry.click();

    // input aria-label="Select countries"
    await page.waitForTimeout(1000);
    const inputCountry = await page.$("input[aria-label='Select countries']");
    await inputCountry.type(data.country, { delay: 25 });

    // md-autocomplete-parent-scope

    await page.waitForTimeout(1000);
    const selectExactCountry = await page.$("md-autocomplete-parent-scope");
    await selectExactCountry.click();

    // button aria-label="next tab"
    await page.waitForTimeout(1000);
    const nextButtonPage4 = await page.$("button[aria-label='next tab']");
    await nextButtonPage4.click();

    // ***************************************
    // fifth page
    // ***************************************

    // md-checkbox  aria-label="url"
    await page.waitForTimeout(5000);
    // md-tab-content id="tab-content-4"

    const tabContent7 = await page.$("md-tab-content[id='tab-content-7']");
    const list = await tabContent7.$$("md-list-item");
    for (let i in list) {
        const item = list[i];
        const shouldItemClick = await item.evaluate((el) => {
            const text = el.innerText.toLowerCase();
            if (text.includes("data") && text.includes("center")) return true;
            false;
        });
        if (shouldItemClick) {
            await item.click();
            break;
        }
    }

    // button ng-click="$ctrl.integration = true"
    await page.waitForTimeout(1000);
    const saveButton = await page.$("button[ng-click='$ctrl.integration = true']");
    await saveButton.click();

    // ***************************************
    // final page
    // ***************************************
    await page.waitForTimeout(5000);

    // console.log();

    // https://app.fraudfilter.io/#/deployment/5644910093402112

    // await page.goto("https://app.fraudfilter.io/#/deployment/5644910093402112");
    // await page.waitForTimeout(5000);
    data.optionUrl = await page.url();

    const uploadTabBtns = await page.$$("md-tab-item");
    for (let i in uploadTabBtns) {
        const uploadTabBtn = uploadTabBtns[i];
        const shouldClick = await uploadTabBtn.evaluate((el) => {
            const text = el.innerText.toLowerCase();
            if (text.includes("php") && text.includes("upload")) {
                return true;
            }
            return false;
        });
        if (shouldClick) {
            await uploadTabBtn.click();
            break;
        }
    }

    // button ng-show='$ctrl.openedTabPath < 3'
    await page.waitForTimeout(2000);
    const showDownloadBtn = await page.$("button[ng-show='$ctrl.openedTabPath < 3']");
    await showDownloadBtn.click();
    await page._client.send("Page.setDownloadBehavior", { behavior: "allow", downloadPath: "./" });

    // button ng-show='$ctrl.openedTabPath < 3'
    await page.waitForTimeout(2000);
    const aDownload = await page.$("a[download]");

    const file = fs.createWriteStream(`./session/indexes/${data.name}.zip`);
    const href = await aDownload.evaluate((el) => el.getAttribute("href"));
    console.log(href);
    const request = http.get(href, function (response) {
        response.pipe(file);
    });
    // await aDownload.click();
    fs.writeFileSync(`./session/indexes/${data.name}.json`, JSON.stringify(data));
    console.log(data.name, data.optionUrl, `./session/indexes/${data.name}.zip`);

    
}

main();
