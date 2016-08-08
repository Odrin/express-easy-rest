"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./easy-rest/controller'));
__export(require('./easy-rest/core'));
__export(require('./easy-rest/decorators'));
__export(require('./easy-rest/util'));
exports.middleware = require('./middleware');
