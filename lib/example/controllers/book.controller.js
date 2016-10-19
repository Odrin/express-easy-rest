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
const book_1 = require("../models/book");
let BookController_1 = class BookController extends index_1.ApiController {
    getBookList() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(this.ok(BookController_1.books)), 3000);
        });
    }
    getBook(id) {
        return new Promise((resolve) => {
            var book = BookController_1.books.filter((book) => book.id === id)[0];
            setTimeout(() => {
                if (book) {
                    resolve(this.ok(book));
                }
                else {
                    resolve(this.notFound());
                }
            }, 1000);
        });
    }
    addBook(book) {
        if (!book) {
            return this.error();
        }
        BookController_1.books.push(book);
        return this.ok();
    }
};
let BookController = BookController_1;
BookController.books = [
    { id: 1, name: 'book 1' },
    { id: 2, name: 'book 2' },
    { id: 3, name: 'book 3' }
];
__decorate([
    index_1.Get('/list'), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', Promise)
], BookController.prototype, "getBookList", null);
__decorate([
    index_1.Get('/:id'),
    __param(0, index_1.FromRoute('id')), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Number]), 
    __metadata('design:returntype', Promise)
], BookController.prototype, "getBook", null);
__decorate([
    index_1.Post('/add'),
    __param(0, index_1.FromBody()), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [book_1.Book]), 
    __metadata('design:returntype', Object)
], BookController.prototype, "addBook", null);
BookController = BookController_1 = __decorate([
    index_1.Controller({ basePath: '/book' }), 
    __metadata('design:paramtypes', [])
], BookController);
exports.BookController = BookController;
