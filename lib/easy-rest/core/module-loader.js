"use strict";
var Glob = require('glob');
var ModuleLoader = (function () {
    function ModuleLoader() {
    }
    ModuleLoader.load = function (pattern) {
        var files = Glob.sync(pattern);
        for (var i = 0; i < files.length; i++) {
            require(files[i]);
        }
    };
    ModuleLoader.controllers = [];
    return ModuleLoader;
}());
exports.ModuleLoader = ModuleLoader;
