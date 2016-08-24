"use strict";
var HttpContext = (function () {
    function HttpContext(req, res, nxt) {
        this.req = req;
        this.res = res;
        this.nxt = nxt;
    }
    Object.defineProperty(HttpContext.prototype, "request", {
        get: function () {
            return this.req;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HttpContext.prototype, "response", {
        get: function () {
            return this.res;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HttpContext.prototype, "next", {
        get: function () {
            return this.nxt;
        },
        enumerable: true,
        configurable: true
    });
    return HttpContext;
}());
exports.HttpContext = HttpContext;
