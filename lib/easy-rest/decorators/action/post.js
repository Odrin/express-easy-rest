"use strict";
require("reflect-metadata");
var action_1 = require("./action");
function post(path) {
    var options = {
        method: 'post',
        path: path
    };
    return action_1.action(options);
}
exports.post = post;
