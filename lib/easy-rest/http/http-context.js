"use strict";
class HttpContext {
    constructor(req, res, nxt) {
        this.req = req;
        this.res = res;
        this.nxt = nxt;
    }
    get request() {
        return this.req;
    }
    get response() {
        return this.res;
    }
    get next() {
        return this.nxt;
    }
}
exports.HttpContext = HttpContext;
