"use strict";
const index_1 = require("../index");
class SimpleApp extends index_1.ApplicationInstance {
    constructor() {
        super();
        this.controllersPathPattern = __dirname + '/controllers/**/*.js';
        this.authenticationProvider = this.getAuthProvider();
    }
    onRequest(httpContext) {
        console.log('Handle any request here');
        httpContext.next();
    }
    onError(error, httpContext) {
        if (!httpContext.response.headersSent) {
            httpContext.response.status(500);
            httpContext.response.send('Sorry, service temporarily unavailable.');
        }
        httpContext.next();
    }
    getAuthProvider() {
        return {
            onAuthentication(req, res) {
                let session = req['session'] || {};
                let principal = {
                    identity: {
                        authenticationType: 'form',
                        isAuthenticated: !!session.login,
                        name: session.login || null
                    },
                    isInRole(role) {
                        if (session.login === 'Admin') {
                            return true;
                        }
                        return session.login && role === 'user';
                    }
                };
                return Promise.resolve(principal);
            }
        };
    }
}
exports.SimpleApp = SimpleApp;
