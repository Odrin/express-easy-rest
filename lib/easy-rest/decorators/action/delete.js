"use strict";
require("reflect-metadata");
const action_1 = require("./action");
function Delete(path) {
    let options = {
        method: 'delete',
        path
    };
    return action_1.Action(options);
}
exports.Delete = Delete;
