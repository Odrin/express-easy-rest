"use strict";
var Glob = require('glob');
var loaded = [];
var ModuleLoader = (function () {
    function ModuleLoader() {
    }
    ModuleLoader.load = function (pattern) {
        var files = Glob.sync(pattern);
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (loaded.indexOf(file) !== -1) {
                continue;
            }
            require(file);
            loaded.push(file);
        }
    };
    ModuleLoader.controllers = [];
    return ModuleLoader;
}());
exports.ModuleLoader = ModuleLoader;
