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
const book_controller_1 = require("./book.controller");
let UserController_1 = class UserController extends index_1.ApiController {
    getBookList() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(this.ok(UserController_1.books)), 3000);
        });
    }
    addBook(id) {
        let book = book_controller_1.BookController.books.filter((book) => book.id === id)[0];
        if (!book) {
            return this.badRequest();
        }
        if (UserController_1.books.every((book) => book.id !== id)) {
            UserController_1.books.push(book);
        }
        return this.ok();
    }
    signIn(login, pwd) {
        if (!login || !pwd) {
            return this.badRequest('Incorrect auth data');
        }
        let user = this.getUserByLogin(login);
        if (user === null) {
            return this.notFound(`User "${login}" not found`);
        }
        if (user.pwd !== pwd) {
            return this.badRequest('Incorrect password');
        }
        this.request['session'].login = login;
        return this.ok();
    }
    getUserByLogin(login) {
        for (let user of UserController_1.users) {
            if (user.login === login) {
                return user;
            }
        }
        return null;
    }
};
let UserController = UserController_1;
UserController.books = [
    { id: 2, name: 'book 2' },
    { id: 3, name: 'book 3' }
];
UserController.users = [
    { login: 'Admin', pwd: 'qwerty' },
    { login: 'User', pwd: 'user123' }
];
__decorate([
    index_1.Get('/user/book/list'), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', Promise)
], UserController.prototype, "getBookList", null);
__decorate([
    index_1.Post('/user/book/add'),
    __param(0, index_1.FromBody('id')), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Number]), 
    __metadata('design:returntype', Object)
], UserController.prototype, "addBook", null);
__decorate([
    index_1.AllowAnonymous(),
    index_1.Post('/user/signin'),
    __param(0, index_1.FromBody('login')),
    __param(1, index_1.FromBody('pwd')), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [String, String]), 
    __metadata('design:returntype', Object)
], UserController.prototype, "signIn", null);
UserController = UserController_1 = __decorate([
    index_1.Authorize('user'),
    index_1.Controller(), 
    __metadata('design:paramtypes', [])
], UserController);
exports.UserController = UserController;
