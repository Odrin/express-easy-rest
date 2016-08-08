"use strict";
require("reflect-metadata");
var action_1 = require("./action");
function put(path) {
    var options = {
        method: 'put',
        path: path
    };
    return action_1.action(options);
}
exports.put = put;
