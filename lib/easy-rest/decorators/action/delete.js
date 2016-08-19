"use strict";
require("reflect-metadata");
var action_1 = require("./action");
function Delete(path) {
    var options = {
        method: 'delete',
        path: path
    };
    return action_1.Action(options);
}
exports.Delete = Delete;
