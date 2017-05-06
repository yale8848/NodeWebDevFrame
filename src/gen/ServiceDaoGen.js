let fs = require('fs');
let path = require('path');

const readline = require('readline');

let serviceName = 'TestService';
let daoName = 'TestDao';
let modelName = 'tb_test_model';
let idName = 'test_id';

if (serviceName.length == 0) {

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

let createDao = (p, newDao) => {
    fs.readFile(p, 'utf-8', function(err, data) {
        if (err) throw err;

        data = data.replace(/TPLDAO/g, daoName);
        data = data.replace(/{{modelName}}/g, modelName);
        data = data.replace(/{{id}}/g, idName);

        fs.writeFile(newDao, data, function(err) {
            if (err) throw err;

            console.log("created: " + newDao);
            GenService();
        });
    });
}

let GenDao = (name) => {
    let daoTPL = "dao/TPL.js";
    let p = path.resolve(__dirname, '../' + daoTPL);
    let newDao = path.resolve(__dirname, '../dao/' + daoName + ".js");

    if (!fs.existsSync(newDao)) {
        createDao(p, newDao);
        return;
    }

    readSyncByRl('to overwrite ' + newDao + "  Y/N? : ").then(l => {
        if (!(l.toLowerCase() == 'y')) {
            console.log("quit");
            process.exit(0);
            return;
        }
        createDao(p, newDao);
    });

}

let createService = (p, newService) => {
    fs.readFile(p, 'utf-8', function(err, data) {
        if (err) throw err;

        data = data.replace(/TPLSERVICE/g, serviceName);
        data = data.replace(/{{daoName}}/g, daoName);

        fs.writeFile(newService, data, function(err) {
            if (err) throw err;

            console.log("created: " + newService);
        });
    });
}
let GenService = () => {
    let serviceTPL = "service/TPL.js";
    let p = path.resolve(__dirname, '../' + serviceTPL);
    let newService = path.resolve(__dirname, '../service/' + serviceName + ".js");
    if (!fs.existsSync(newService)) {
        createService(p, newService);
        return;
    }
    readSyncByRl('to overwrite ' + newService + "  Y/N ?: ").then(l => {

        if (!(l.toLowerCase() == 'y')) {
            console.log("quit");
            process.exit(0);
            return;
        }
        createService(p, newService);
    });

}
GenDao();