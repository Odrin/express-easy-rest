<a name="1.0.0"></a>
# [1.0.0](https://github.com/Odrin/express-easy-rest/compare/1.0.0...0.3.1) (2016-10-19)

### Code Refactoring
* ApplicationInstance.errorHandlers replaced by single global onError() handler
* ApplicationInstance.requestHandlers replaced by single global onRequest() handler
* NodeJS 6.X & TypeScript 2.X
* es6-shim typings removed

### Features
* controller initialization via glob, no more need to list all controllers in ApplicationInstance constructor
* added http exceptions support - see HttpError
* ControllerExceptionFilter and ActionExceptionFilter to handle exceptions
* added model validation functionality - see ModelValidator, @Required(), @StringLength(), @Range(), @RegularExpression()

<a name="0.3.2"></a>
# [0.3.2](https://github.com/Odrin/express-easy-rest/compare/0.3.1...0.3.2) (2016-08-31)

### Code Refactoring
* move express NPM dependencies to peerDependencies for better compatibility

<a name="0.3.1"></a>
# [0.3.1](https://github.com/Odrin/express-easy-rest/compare/0.3.0...0.3.1) (2016-08-30)

### Bug Fixes
* PathBuilder returns an incorrect value when base path wasn't specified
* deleted old unused files from lib directory

### Code Refactoring
* simple session example added

<a name="0.3.0"></a>
# [0.3.0](https://github.com/Odrin/express-easy-rest/compare/0.2.2...0.3.0) (2016-08-26)

### Bug Fixes
* fixed double configAuthProvider() call
* fixed action result handler exception for primitives

### Code Refactoring
* renamed "controller" namespace to "api"
* ContextDataProvider removed and HttpContextProvider added instead
* authorization skipping method moved to AuthorizationFilter
* es6-promise dependency replaced by es6-shim typings
* finally appeared the first tests 🎉

### Features
* HttpContext and HttpActionContext added
* Caching class added

<a name="0.2.2"></a>
# [0.2.2](https://github.com/Odrin/express-easy-rest/compare/0.2.0...0.2.2) (2016-08-22)

### Code Refactoring
* fixed authorize decorator naming (authorize -> Authorize)
* some fixes and refactoring in examples

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
