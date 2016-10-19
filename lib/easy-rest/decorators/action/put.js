"use strict";
require("reflect-metadata");
const action_1 = require("./action");
function Put(path) {
    let options = {
        method: 'put',
        path
    };
    return action_1.Action(options);
}
exports.Put = Put;
