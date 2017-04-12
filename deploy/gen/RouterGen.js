let fs = require('fs');
let path = require('path');

const readline = require('readline');

let routerName = 'test';
let serviceName = 'TestService';

if (routerName.length == 0) {
    console.log("not find params");
    return;
}

function readSyncByRl(tips) {
    tips = tips || '> ';

    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(tips, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}
let createRouter = (p, newRouter) => {
    fs.readFile(p, 'utf-8', function(err, data) {
        if (err) throw err;

        if (serviceName.length > 0) {
            data = data.replace(/{{service}}/g, serviceName);
        }

        fs.writeFile(newRouter, data, function(err) {
            if (err) throw err;

            console.log("created: " + newRouter);
        });
    });
}
let router = () => {

    let routerTPL = "routes/TPL.js";
    let p = path.resolve(__dirname, '../../' + routerTPL);
    let newRouter = path.resolve(__dirname, '../../routes/' + routerName + ".js");

    if (!fs.existsSync(newRouter)) {
        createRouter(p, newRouter);
        return;
    }

    readSyncByRl('to overwrite ' + newRouter + "  Y/N? : ").then(l => {

        if (!(l.toLowerCase() == 'y')) {
            console.log("quit");
            process.exit(0);
            return;
        }
        createRouter(p, newRouter);
    });

}

router();