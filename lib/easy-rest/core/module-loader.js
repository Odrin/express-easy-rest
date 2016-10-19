"use strict";
const Glob = require('glob');
let loaded = [];
class ModuleLoader {
    static load(pattern) {
        let files = Glob.sync(pattern);
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (loaded.indexOf(file) !== -1) {
                continue;
            }
            require(file);
            loaded.push(file);
        }
    }
}
ModuleLoader.controllers = [];
exports.ModuleLoader = ModuleLoader;
