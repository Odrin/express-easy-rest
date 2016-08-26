"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var index_1 = require("../../index");
var book_controller_1 = require("./book.controller");
var UserController = (function (_super) {
    __extends(UserController, _super);
    function UserController() {
        _super.apply(this, arguments);
    }
    UserController.prototype.getBookList = function () {
        var _this = this;
        return new Promise(function (resolve) {
            setTimeout(function () { return resolve(_this.ok(UserController.books)); }, 3000);
        });
    };
    UserController.prototype.addBook = function (id) {
        var book = book_controller_1.BookController.books.filter(function (book) { return book.id === id; })[0];
        if (!book) {
            return this.badRequest();
        }
        if (UserController.books.every(function (book) { return book.id !== id; })) {
            UserController.books.push(book);
        }
        return this.ok();
    };
    UserController.books = [
        { id: 2, name: 'book 2' },
        { id: 3, name: 'book 3' }
    ];
    __decorate([
        index_1.AllowAnonymous(),
        index_1.Get('/book/list'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', Promise)
    ], UserController.prototype, "getBookList", null);
    __decorate([
        index_1.Post('/book/add'),
        __param(0, index_1.FromBody()), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Number]), 
        __metadata('design:returntype', Object)
    ], UserController.prototype, "addBook", null);
    UserController = __decorate([
        index_1.Authorize('user'),
        index_1.Controller({ basePath: '/user' }), 
        __metadata('design:paramtypes', [])
    ], UserController);
    return UserController;
}(index_1.ApiController));
exports.UserController = UserController;
