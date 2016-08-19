"use strict";
require("reflect-metadata");
var action_1 = require("./action");
function Post(path) {
    var options = {
        method: 'post',
        path: path
    };
    return action_1.Action(options);
}
exports.Post = Post;
