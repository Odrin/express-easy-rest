"use strict";
const path_builder_1 = require("../../easy-rest/util/path-builder");
describe('Path builder spec', () => {
    it('should return correct path if base path and method path specified', () => {
        let basePath = 'controller';
        let methodPath = 'action';
        let actionName = 'method';
        let result = path_builder_1.PathBuilder.build(basePath, methodPath, actionName);
        expect(result).toEqual(`/${basePath}/${methodPath}`);
    });
    it('should return correct path if only base path specified', () => {
        let basePath = 'controller';
        let methodPath = undefined;
        let actionName = 'method';
        let result = path_builder_1.PathBuilder.build(basePath, methodPath, actionName);
        expect(result).toEqual(`/${basePath}/${actionName}`);
    });
    it('should return correct path if only method path specified', () => {
        let basePath = undefined;
        let methodPath = 'action';
        let actionName = 'method';
        let result = path_builder_1.PathBuilder.build(basePath, methodPath, actionName);
        expect(result).toEqual(`/${methodPath}`);
    });
    it('should return correct path if base path and method path NOT specified', () => {
        let basePath = undefined;
        let methodPath = undefined;
        let actionName = 'method';
        let result = path_builder_1.PathBuilder.build(basePath, methodPath, actionName);
        expect(result).toEqual(`/${actionName}`);
    });
    it('should return correct path if base path and method path contains "/"', () => {
        let basePath = '/controller/';
        let methodPath = '/act/ion/';
        let actionName = 'method';
        let result = path_builder_1.PathBuilder.build(basePath, methodPath, actionName);
        expect(result).toEqual(`/controller/act/ion`);
    });
});
