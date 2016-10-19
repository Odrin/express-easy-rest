"use strict";
class HttpContextProvider {
    static getContext(req) {
        let context = req[HttpContextProvider.HTTP_CONTEXT_KEY];
        if (!context) {
            throw new Error(`Http context is not available. Perhaps it wasn't yet initialized`);
        }
        return context;
    }
    static setContext(req, httpContext) {
        req[HttpContextProvider.HTTP_CONTEXT_KEY] = httpContext;
    }
}
HttpContextProvider.HTTP_CONTEXT_KEY = '_easy-rest-context';
exports.HttpContextProvider = HttpContextProvider;
