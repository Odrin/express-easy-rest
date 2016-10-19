"use strict";
require("reflect-metadata");
const action_1 = require("./action");
function Post(path) {
    let options = {
        method: 'post',
        path
    };
    return action_1.Action(options);
}
exports.Post = Post;
