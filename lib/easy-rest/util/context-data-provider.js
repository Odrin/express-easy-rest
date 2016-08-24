"use strict";
var ContextDataProvider = (function () {
    function ContextDataProvider() {
    }
    ContextDataProvider.getDataContainer = function (req) {
        var data = req['HTTP_CONTEXT_KEY'];
        if (!data) {
            data = {};
            req['HTTP_CONTEXT_KEY'] = data;
        }
        return data;
    };
    ContextDataProvider.getData = function (req, key, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        var data = ContextDataProvider.getDataContainer(req);
        return data[key] || defaultValue;
    };
    ContextDataProvider.setData = function (req, key, value) {
        var data = ContextDataProvider.getDataContainer(req);
        data[key] = value;
    };
    ContextDataProvider.DATA_CONTAINER_KEY = '_easy-rest';
    return ContextDataProvider;
}());
exports.ContextDataProvider = ContextDataProvider;
