"use strict";
require("reflect-metadata");
var action_1 = require("./action");
function Get(path) {
    var options = {
        method: 'get',
        path: path
    };
    return action_1.Action(options);
}
exports.Get = Get;
