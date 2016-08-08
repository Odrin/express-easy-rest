"use strict";
require("reflect-metadata");
var action_1 = require("./action");
function get(path) {
    var options = {
        method: 'get',
        path: path
    };
    return action_1.action(options);
}
exports.get = get;
