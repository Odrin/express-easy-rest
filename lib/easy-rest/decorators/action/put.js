"use strict";
require("reflect-metadata");
var action_1 = require("./action");
function Put(path) {
    var options = {
        method: 'put',
        path: path
    };
    return action_1.Action(options);
}
exports.Put = Put;
