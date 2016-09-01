"use strict";
var path_builder_1 = require("../../easy-rest/util/path-builder");
describe('Path builder spec', function () {
    it('should return correct path if base path and method path specified', function () {
        var basePath = 'controller';
        var methodPath = 'action';
        var actionName = 'method';
        var result = path_builder_1.PathBuilder.build(basePath, methodPath, actionName);
        expect(result).toEqual("/" + basePath + "/" + methodPath);
    });
    it('should return correct path if only base path specified', function () {
        var basePath = 'controller';
        var methodPath = undefined;
        var actionName = 'method';
        var result = path_builder_1.PathBuilder.build(basePath, methodPath, actionName);
        expect(result).toEqual("/" + basePath + "/" + actionName);
    });
    it('should return correct path if only method path specified', function () {
        var basePath = undefined;
        var methodPath = 'action';
        var actionName = 'method';
        var result = path_builder_1.PathBuilder.build(basePath, methodPath, actionName);
        expect(result).toEqual("/" + methodPath);
    });
    it('should return correct path if base path and method path NOT specified', function () {
        var basePath = undefined;
        var methodPath = undefined;
        var actionName = 'method';
        var result = path_builder_1.PathBuilder.build(basePath, methodPath, actionName);
        expect(result).toEqual("/" + actionName);
    });
    it('should return correct path if base path and method path contains "/"', function () {
        var basePath = '/controller/';
        var methodPath = '/act/ion/';
        var actionName = 'method';
        var result = path_builder_1.PathBuilder.build(basePath, methodPath, actionName);
        expect(result).toEqual("/controller/act/ion");
    });
});
