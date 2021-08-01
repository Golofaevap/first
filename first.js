const browser = require("./pptFunctions/getBrowser"); // Golofaeva.xs4n
const newPage = require("./pptFunctions/newPage"); // Golofaeva-p45s
async function main() {
  const opts = {
    headless: false,
    userDataDirPath: "./sessions/test3/userDataDir",
    width: 1366,
    height: 768,
  };

  const brws = await browser(opts);
  const page = await newPage(brws, opts);
}

main();
// varfolomeytrimiraderybkin@yandex.ru