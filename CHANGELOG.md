<a name="0.2.0"></a>
# [0.2.0](https://github.com/Odrin/express-easy-rest/compare/0.1.0...0.2.0) (2016-08-19)

### Bug Fixes
* error handlers now working

### Code Refactoring
* request handles: added IRequestHandler and IErrorRequestHandler instead of Express.RequestHandler and ErrorRequestHandler; handlers now async and using promises;
* added class Metadata to encapsulate Reflect lib
* removed EasyRestConfig, all logic moved to ApplicationInstance
* temporarily added ContextDataProvider which will be replaced with HttpContext and ActionContext in future
* decorators naming changed to CamelCase instead of lowerCamelCase
* Controller renamed to ApiController

### Features
* authentication added - see IAuthenticationProvider, IPrincipal, IIdentity;
* authorization decorators added - see @authorize, @allowAnonymous
