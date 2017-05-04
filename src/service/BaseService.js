let Response = require('./Response');

module.exports = class BaseServer {

    getResp() {
        return new Response();
    }

}