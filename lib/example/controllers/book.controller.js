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
var es6_promise_1 = require("es6-promise");
var controller_1 = require("../../easy-rest/controller/controller");
var from_route_1 = require("../../easy-rest/decorators/binding/from-route");
var controller_2 = require("../../easy-rest/decorators/controller/controller");
var get_1 = require("../../easy-rest/decorators/action/get");
var post_1 = require("../../easy-rest/decorators/action/post");
var from_body_1 = require("../../easy-rest/decorators/binding/from-body");
var BookController = (function (_super) {
    __extends(BookController, _super);
    function BookController() {
        _super.apply(this, arguments);
    }
    BookController.prototype.getBookList = function () {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve) {
            setTimeout(function () { return resolve(_this.ok(BookController.books)); }, 3000);
        });
    };
    BookController.prototype.getPrivateBookList = function () {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve) {
            setTimeout(function () { return resolve(_this.ok(BookController.books)); }, 3000);
        });
    };
    BookController.prototype.getBook = function (id) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve) {
            var book = BookController.books.filter(function (book) { return book.id === id; })[0];
            setTimeout(function () {
                if (book) {
                    resolve(_this.ok(book));
                }
                else {
                    resolve(_this.notFound());
                }
            }, 1000);
        });
    };
    BookController.prototype.addBook = function (book) {
        if (!book) {
            return this.error();
        }
        BookController.books.push(book);
        return this.ok();
    };
    BookController.books = [
        { id: 1, name: 'book 1' },
        { id: 2, name: 'book 2' },
        { id: 3, name: 'book 3' }
    ];
    __decorate([
        get_1.Get('/list'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', es6_promise_1.Promise)
    ], BookController.prototype, "getBookList", null);
    __decorate([
        get_1.Get('/list/private'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', es6_promise_1.Promise)
    ], BookController.prototype, "getPrivateBookList", null);
    __decorate([
        get_1.Get('/:id'),
        __param(0, from_route_1.FromRoute('id')), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Number]), 
        __metadata('design:returntype', es6_promise_1.Promise)
    ], BookController.prototype, "getBook", null);
    __decorate([
        post_1.Post('/add'),
        __param(0, from_body_1.FromBody()), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Book]), 
        __metadata('design:returntype', Object)
    ], BookController.prototype, "addBook", null);
    BookController = __decorate([
        controller_2.Controller({ basePath: '/book' }), 
        __metadata('design:paramtypes', [])
    ], BookController);
    return BookController;
}(controller_1.ApiController));
exports.BookController = BookController;
var Book = (function () {
    function Book() {
    }
    return Book;
}());
exports.Book = Book;
