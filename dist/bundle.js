/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	(function () {

	    var req = __webpack_require__(1),
	        features = [
	            { title: 'Constants', path: './constants/constants.html' },
	            { title: 'Arrow functions - Expression bodies', path: './arrowFunctions/expressionBodies.html' },
	            { title: 'Arrow functions - Statement bodies', path: './arrowFunctions/statementBodies.html' },
	            { title: 'Arrow functions - Lexical \'this\'', path: './arrowFunctions/lexicalThis.html' },
	            { title: 'Extended parameter handling - Default parameter values', path: './extendedParameterHandling/defaultParameterValues.html' },
	            { title: 'Extended parameter handling - Rest parameter', path: './extendedParameterHandling/restParameter.html' },
	            { title: 'Extended parameter handling - Spread operator', path: './extendedParameterHandling/spreadOperator.html' },
	            { title: 'Template literals - String interpolation', path: './templateLiterals/stringInterpolation.html' },
	            { title: 'Enhanced object properties - Property shorthand', path: './enhancedObjectProperties/propertyShorthand.html' },
	            { title: 'Enhanced object properties - Computed property names', path: './enhancedObjectProperties/computedPropertyNames.html' },
	            { title: 'Enhanced object properties - Method properties', path: './enhancedObjectProperties/methodProperties.html' },
	            { title: 'Destructing assignment - Parameter context matching', path: './destructuringAssignment/parameterContextMatching.html' },
	            { title: 'Modules - Value export / import', path: './modules/valueExportImport.html' },
	            { title: 'Modules - Default and wildcard', path: './modules/defaultAndWildcard.html' },
	            { title: 'Classes - class definition', path: './classes/classDefinition.html' },
	            { title: 'Classes - class inheritance', path: './classes/classInheritance.html' }
	        ];

	    registerFeaturesMenu(features);
	    registerFeaturesContent(features);

	    function registerFeaturesMenu(features) {
	        var featuresMenuElement = document.createElement('features-menu'),
	            featuresMenuLinkElement;
	        features.forEach(function (featureTemplate, index) {
	            featuresMenuLinkElement = document.createElement('a');
	            featuresMenuLinkElement.innerText = featureTemplate.title;
	            featuresMenuLinkElement.className = 'features-menu-link';
	            featuresMenuLinkElement.setAttribute('target', index);
	            featuresMenuElement.appendChild(featuresMenuLinkElement);
	            featuresMenuLinkElement.addEventListener('click', function (e) {
	                var featuresContentElementId = 'feature-' + e.target.getAttribute('target'),
	                    featureContentElement = document.getElementById(featuresContentElementId),
	                    featureContentStyle = featureContentElement.style;
	                featureContentStyle.display = (featureContentElement.offsetParent === null) ? 'block' : 'none';
	            });
	        });
	        document.body.appendChild(featuresMenuElement);
	    }

	    function registerFeaturesContent(features) {
	        var featuresContentElement = document.createElement('features-content');
	        features.forEach(function (featureTemplate, index) {
	            featuresContentElement.innerHTML +=  '<feature-content id="feature-' + index + '" class="feature-content">' +
	                                                    '<h1>' + featureTemplate.title + '</h1>' +
	                                                    req(featureTemplate.path) +
	                                                '</feature-content>';
	        });
	        document.body.appendChild(featuresContentElement);
	    }
	})();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./arrowFunctions/expressionBodies.html": 2,
		"./arrowFunctions/lexicalThis.html": 3,
		"./arrowFunctions/statementBodies.html": 4,
		"./classes/classDefinition.html": 5,
		"./classes/classInheritance.html": 6,
		"./constants/constants.html": 7,
		"./destructuringAssignment/parameterContextMatching.html": 8,
		"./enhancedObjectProperties/computedPropertyNames.html": 9,
		"./enhancedObjectProperties/methodProperties.html": 10,
		"./enhancedObjectProperties/propertyShorthand.html": 11,
		"./extendedParameterHandling/defaultParameterValues.html": 12,
		"./extendedParameterHandling/restParameter.html": 13,
		"./extendedParameterHandling/spreadOperator.html": 14,
		"./index.html": 15,
		"./modules/defaultAndWildcard.html": 16,
		"./modules/valueExportImport.html": 17,
		"./templateLiterals/stringInterpolation.html": 18
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 1;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    //The left part of the arrow represents the fn arguments, and the right part, the return statement\r\n    odds  = evens.map(v => v + 1), //single argument, returns a primitive\r\n    pairs = evens.map(v => ({ even: v, odd: v + 1 })), //single argument, returns an object\r\n    nums  = evens.map((v, i) => v + i) //multiple arguments, return a primitive\r\n</pre>\r\n<pre data-language=\"javascript\"  data-es5>\r\n    odds  = evens.map(function (v) { return v + 1 }),\r\n    pairs = evens.map(function (v) { return { even: v, odd: v + 1 } }),\r\n    nums  = evens.map(function (v, i) { return v + i })\r\n</pre>";

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    //As we're not explicitely definiing any callback function,\r\n    //we don't need to save the reference to 'this'\r\n    this.nums.forEach((v) => {\r\n        if (v % 5 === 0)\r\n            this.fives.push(v)\r\n    })\r\n</pre>\r\n<pre data-language=\"javascript\" data-es5>\r\n    var self = this\r\n    this.nums.forEach(function (v) {\r\n        if (v % 5 === 0)\r\n            self.fives.push(v)\r\n    })\r\n</pre>";

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    //Here the right side of the arrow is a function (Interestingly wrapped by curly bracets)\r\n    //I guess the 'return' statement will be still valid here\r\n    nums.forEach(v => {\r\n        if (v % 5 === 0) {\r\n            fives.push(v)\r\n        }\r\n    })\r\n</pre>";

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    class Shape {\r\n        constructor (id, x, y) {\r\n            this.id = id\r\n            this.move(x, y)\r\n        }\r\n        move (x, y) {\r\n            this.x = x\r\n            this.y = y\r\n        }\r\n    }\r\n</pre>\r\n<pre data-language=\"javascript\" data-es5>\r\n    var Shape = function (id, x, y) {\r\n        this.id = id;\r\n        this.move(x, y);\r\n    };\r\n    Shape.prototype.move = function (x, y) {\r\n        this.x = x;\r\n        this.y = y;\r\n    };\r\n</pre>";

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    //Classes can extend other classes, as we used to do with Object.create\r\n    class Rectangle extends Shape {\r\n        constructor (id, x, y, width, height) {\r\n            super(id, x, y) //calls the constructor of the 'super' == parent classes\r\n            //This is overriding the width & height props following classical prototypical inheritance\r\n            this.width  = width\r\n            this.height = height\r\n        }\r\n    }\r\n    class Circle extends Shape {\r\n        constructor (id, x, y, radius) {\r\n            super(id, x, y)\r\n            //This is adding a new property to the Circle class, not available on the parent (Shape) class\r\n            this.radius = radius\r\n        }\r\n    }\r\n</pre>\r\n<pre data-language=\"javascript\" data-es5>\r\n    var Rectangle = function (id, x, y, width, height) {\r\n        Shape.call(this, id, x, y);\r\n        this.width  = width;\r\n        this.height = height;\r\n    };\r\n    Rectangle.prototype = Object.create(Shape.prototype);\r\n    Rectangle.prototype.constructor = Rectangle;\r\n    var Circle = function (id, x, y, radius) {\r\n        Shape.call(this, id, x, y);\r\n        this.radius = radius;\r\n    };\r\n    Circle.prototype = Object.create(Shape.prototype);\r\n    Circle.prototype.constructor = Circle;\r\n</pre>";

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    const PI = 3.141593\r\n    //PI is unmutable, so further updates on its value will be ignored.\r\n    //Notice: this only makes the variable itself immutable, not its assigned content\r\n    //(for instance, in case the content is an object, this means the object itself can still be altered).\r\n</pre>";

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    //It's not just possible to initialise variables, as we saw before,\r\n    //but also to destructure arrays and objects into individual objects during function calls\r\n    function f ([ name, val ]) {\r\n        console.log(name, val)\r\n    }\r\n    function g ({ name: n, val: v }) {\r\n        console.log(n, v)\r\n    }\r\n    function h ({ name, val }) {\r\n        console.log(name, val)\r\n    }\r\n    f([ \"bar\", 42 ])\r\n    g({ name: \"foo\", val:  7 })\r\n    h({ name: \"bar\", val: 42 })\r\n</pre>\r\n<pre data-language=\"javascript\" data-es5>\r\n    function f (arg) {\r\n        var name = arg[0]\r\n        var val  = arg[1]\r\n        console.log(name, val)\r\n    }\r\n    function g (arg) {\r\n        var n = arg.name\r\n        var v = arg.val\r\n        console.log(n, v)\r\n    }\r\n    function h (arg) {\r\n        var name = arg.name\r\n        var val  = arg.val\r\n        console.log(name, val)\r\n    }\r\n    f([ \"bar\", 42 ])\r\n    g({ name: \"foo\", val:  7 })\r\n    h({ name: \"bar\", val: 42 })\r\n    </pre>";

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    obj = {\r\n        foo: \"bar\",\r\n        [ \"prop_\" + foo() ]: 42 //This technique allows to define custom properties inline\r\n    }\r\n</pre>\r\n<pre data-language=\"javascript\" data-es5>\r\n    obj = {\r\n        foo: \"bar\"\r\n    }\r\n    obj[ \"prop_\" + foo() ] = 42\r\n</pre>";

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    obj = {\r\n        foo (a, b) { //regular function\r\n        },\r\n        *quux (x, y) { //generator function\r\n        }\r\n    }\r\n</pre>\r\n<pre data-language=\"javascript\" data-es5>\r\n    obj = {\r\n        foo: function (a, b) {\r\n        },\r\n        //  quux: no equivalent generator function in ES5\r\n    }\r\n</pre>";

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    obj = { x, y }\r\n</pre>\r\n<pre data-language=\"javascript\" data-es5>\r\n    obj = { x: x, y: y }\r\n</pre>";

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    //Clean. Obvious. Great.\r\n    function f (x, y = 7, z = 42) {\r\n        return x + y + z\r\n    }\r\n    f(1) === 50\r\n</pre>";

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    //a = [\"hello\", true, 7]\r\n    function f (x, y, ...a) {\r\n        return (x + y) * a.length\r\n    }\r\n    f(1, 2, \"hello\", true, 7) === 9\r\n</pre>";

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    //So using '...' is a way to manage serialised arguments\r\n    var params = [ \"hello\", true, 7 ]\r\n    var other = [ 1, 2, ...params ] // [ 1, 2, \"hello\", true, 7 ]\r\n    f(1, 2, ...params) === 9\r\n\r\n    var str = \"foo\"\r\n    //Those serialised arguments are translated into an array by just wrapping it\r\n    //so if a = 'foo', ...a = 'f','o','o', and then [...a] = ['f', 'o', 'o']\r\n    var chars = [ ...str ] // [ \"f\", \"o\", \"o\" ]\r\n</pre>";

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = "<html>\r\n    <head>\r\n        <link rel=\"stylesheet\" type=\"text/css\" href=\"./styles.css\">\r\n        <link href=\"../vendor/rainbow/github.css\" rel=\"stylesheet\" type=\"text/css\">\r\n    </head>\r\n    <body>\r\n    let vs var???\r\n        <script type=\"text/javascript\" src=\"../dist/bundle.js\"></script>\r\n\r\n        <script src=\"../vendor/rainbow/rainbow.min.js\"></script>\r\n        <script src=\"../vendor/rainbow/generic.js\"></script>\r\n        <script src=\"../vendor/rainbow/javascript.js\"></script>\r\n\r\n        <script src=\"http://localhost:35729/livereload.js\"></script>\r\n    </body>\r\n</html>";

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    //  lib/mathplusplus.js\r\n    //This is like tunneling all the variables from lib/math via lib/mathplusplus.js\r\n    export * from \"lib/math\"\r\n    export var e = 2.71828182846\r\n    export default (x) => Math.exp(x) //Here we export the default value of the mathplusplus module\r\n\r\n    //  someApp.js\r\n    //pi was originally exposed by lib/math, but exported again via mathplusplus\r\n    //as exp doesn't match with any variable of mathplusplus, it takes the default one\r\n    import exp, { pi, e } from \"lib/mathplusplus\"\r\n    console.log(\"e^{π} = \" + exp(pi))\r\n</pre>";

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    //  lib/math.js\r\n    export function sum (x, y) { return x + y } //Function available using import\r\n    export var pi = 3.141593 //Variable available using import\r\n\r\n    //  someApp.js\r\n    //Importing all the components from lib/math.js. Please note we need to define the placeholder with 'as'\r\n    import * as math from \"lib/math\"\r\n    console.log(\"2π = \" + math.sum(math.pi, math.pi))\r\n\r\n    //  otherApp.js\r\n    //Importing the function and the variable specifically the components from lib/math.js\r\n    import { sum, pi } from \"lib/math\"\r\n    console.log(\"2π = \" + sum(pi, pi))\r\n</pre>";

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    var customer = { name: \"Foo\" }\r\n    var card = { amount: 7, product: \"Bar\", unitprice: 42 }\r\n    message = `Hello ${customer.name},\r\n    want to buy ${card.amount} ${card.product} for\r\n    a total of ${card.amount * card.unitprice} bucks?`\r\n</pre>";

/***/ }
/******/ ]);