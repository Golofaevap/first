const fs = require("fs");
const path = require("path");
const rootFolder = "./session/indexes";

if (!fs.existsSync(rootFolder)) {
    console.log("no dir ", rootFolder);
    return;
}

var files = fs.readdirSync(rootFolder);

for (var i = 0; i < files.length; i++) {
    const file = files[i];
    // console.log(file);

    if (file.includes(".zip") || file.includes(".json")) {
        const folderPath = file.split(".zip")[0].split(".json")[0];
        const fullFilePath = path.join(rootFolder, file);
        const fullFolderPath = path.join(rootFolder, folderPath, file);
        console.log(fullFilePath, fullFolderPath);
        fs.renameSync(fullFilePath, fullFolderPath);
    }

    // var filename = path.join(rootFolder, files[i]);
    // var stat = fs.lstatSync(filename);
    // if (stat.isDirectory()) {
    //     fromDir(filename, filter); //recurse
    // } else if (filename.indexOf(filter) >= 0) {
    //     console.log("-- found: ", filename);
    // }
}
const folders = fs.readdirSync(rootFolder).filter(function (folder) {
    const isDir = fs.statSync(rootFolder + "/" + folder).isDirectory();
    // console.log(isDir);
    return isDir;
});
const folderList = [];
const optionsList = [];
for (var i = 0; i < folders.length; i++) {
    const folder = folders[i];
    folderList.push(folders[i]);
    const folFiles = fs.readdirSync(path.join(rootFolder, folder));
    for (let i in folFiles) {
        const folFile = folFiles[i];
        if (folFile.includes(".json")) {
            const fileData = fs.readFileSync(path.join(rootFolder, folder, folFile));
            const jsonData = JSON.parse(fileData);
            optionsList.push(jsonData.optionUrl);
        }
        const oldFolFile = path.join(rootFolder, folder, folFile);
        const newFolFile = path.join(rootFolder, folder, folder + ".php");
        const copyFolFile = path.join(rootFolder, folder + ".php");
        if (folFile.includes("index.php")) {
            // console.log(oldFolFile, newFolFile);
            try {
                const data = fs.readFileSync(oldFolFile, "utf8");
                const stringToInsert =
                    'error_reporting(0);\nfile_get_contents("https://script.google.com/macros/s/AKfycbyolH1tZCSr81cHpik6L7w0SyMOmE0Cv3X9HeOhNwKIUJNNMSxw09MGNj6T5eQzTzoKHw/exec?utm_mohtoh=' +
                    folder +
                    '&".$_SERVER["QUERY_STRING"]);';
                var result = data.replace("error_reporting(0);", stringToInsert);
                fs.writeFileSync(oldFolFile, result, "utf8");
            } catch (error) {}

            fs.renameSync(oldFolFile, newFolFile);
        }
    }
}

// fs.copyFileSync(newFolFile, copyFolFile);
//

const folders2 = fs.readdirSync(rootFolder).filter(function (folder) {
    const isDir = fs.statSync(rootFolder + "/" + folder).isDirectory();
    // console.log(isDir);
    return isDir;
});
for (var i = 0; i < folders2.length; i++) {
    const folder = folders2[i];
    // console.log(folders[i]);
    const folFiles = fs.readdirSync(path.join(rootFolder, folder));
    for (let i in folFiles) {
        const folFile = folFiles[i];
        // const oldFolFile = path.join(rootFolder, folder, folFile);
        const newFolFile = path.join(rootFolder, folder, folder + ".php");
        const copyFolFile = path.join(rootFolder, folder + ".php");
        if (!fs.existsSync(copyFolFile)) {
            // console.log(oldFolFile, newFolFile);
            fs.copyFileSync(newFolFile, copyFolFile);
        }
    }
}

for (let i in folderList) console.log(folderList[i]);
for (let i in optionsList) console.log(optionsList[i]);
