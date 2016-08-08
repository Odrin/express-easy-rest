"use strict";
var PathBuilder = (function () {
    function PathBuilder() {
    }
    PathBuilder.build = function (basePath, methodPath, action) {
        if (basePath && typeof (methodPath) !== 'string') {
            throw new Error("Path builder error: incompatible types");
        }
        if (!!methodPath && typeof (methodPath) !== 'string') {
            return methodPath;
        }
        return '/' + (basePath.replace(/^\/+|\/+$/g, '') || '') +
            '/' + (methodPath.replace(/^\/+|\/+$/g, '') || action.toLowerCase());
    };
    return PathBuilder;
}());
exports.PathBuilder = PathBuilder;
