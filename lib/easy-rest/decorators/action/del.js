"use strict";
require("reflect-metadata");
var action_1 = require("./action");
function del(path) {
    var options = {
        method: 'delete',
        path: path
    };
    return action_1.action(options);
}
exports.del = del;
