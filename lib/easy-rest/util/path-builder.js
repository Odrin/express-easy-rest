"use strict";
class PathBuilder {
    static build(basePath, methodPath, action) {
        if (basePath && methodPath && typeof (methodPath) !== 'string') {
            throw new Error(`Path builder error: incompatible types`);
        }
        if (methodPath && typeof (methodPath) !== 'string') {
            return methodPath;
        }
        basePath = basePath ? '/' + basePath.replace(/^\/+|\/+$/g, '') : '';
        return basePath + '/' + (methodPath || action.toLowerCase()).replace(/^\/+|\/+$/g, '');
    }
}
exports.PathBuilder = PathBuilder;
