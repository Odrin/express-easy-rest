"use strict";
require("reflect-metadata");
const action_1 = require("./action");
function Get(path) {
    let options = {
        method: 'get',
        path
    };
    return action_1.Action(options);
}
exports.Get = Get;
