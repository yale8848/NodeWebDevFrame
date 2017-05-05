let config = require('../config/config');
let index = require('./index');


let routers = {

    init: (app) => {
        this.app = app;
        return routers;
    },
    addRouters: () => {
        let app = this.app;
        config.addRouter(app, '/', index);
        return routers;
    }
};

module.exports = routers;