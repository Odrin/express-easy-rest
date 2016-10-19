"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
const index_1 = require("../../index");
let SimpleController = class SimpleController extends index_1.ApiController {
    constructor() {
        super();
    }
    hello(name) {
        return `Hello ${name}`;
    }
    getObject(name) {
        return {
            field: 'some object field'
        };
    }
    getError() {
        throw new Error('My test error');
    }
    getNotFoundError() {
        throw new index_1.NotFoundError('I can\'t find what you want');
    }
};
__decorate([
    index_1.Action({ method: 'get', path: '/hello/:name' }),
    __param(0, index_1.FromRoute('name')), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [String]), 
    __metadata('design:returntype', String)
], SimpleController.prototype, "hello", null);
__decorate([
    index_1.Get('/object'),
    __param(0, index_1.FromRoute('name')), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [String]), 
    __metadata('design:returntype', Object)
], SimpleController.prototype, "getObject", null);
__decorate([
    index_1.Get('/error'), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], SimpleController.prototype, "getError", null);
__decorate([
    index_1.Get('/notfound'), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], SimpleController.prototype, "getNotFoundError", null);
SimpleController = __decorate([
    index_1.Controller({ basePath: '/simple' }),
    index_1.ControllerExceptionFilter(exceptionHandler), 
    __metadata('design:paramtypes', [])
], SimpleController);
exports.SimpleController = SimpleController;
function exceptionHandler(context, error) {
    context.httpContext.response.status(200).send(`error was suppressed: ${error}`);
    context.httpContext.next();
}
