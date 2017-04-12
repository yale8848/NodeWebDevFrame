module.exports = class Response {

    constructor() {
        this.code = 0;
        this.success = false;
        this.message = "";
        this.data = {};

    };
    msg(message) {
        !message || (this.message = message);
        return this;
    }
    ok(data, message) {
        this.success = true;
        !data || (this.data = data);
        !message || (this.message = message);
        return this;
    };
    fail(message) {
        !message || (this.message = message);
        return this;
    }
    str() {
        return JSON.stringify(this);
    }
    code(c) {
        !c || (this.code = c);
        return this;
    }

}