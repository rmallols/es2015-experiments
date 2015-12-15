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

	var domBuilder = __webpack_require__(1),
	    features = __webpack_require__(23);

	module.exports = {
	    init: function () {
	        var featuresList = features.getList();
	        domBuilder.registerFeaturesMenu(featuresList);
	        domBuilder.registerFeaturesContent(featuresList);
	        domBuilder.registerNoFeaturesContentMessage();
	    }
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var req = __webpack_require__(2);

	function createFeatureGroupEl(featureGroup) {
	    var featuresMenuGroupEl = document.createElement('div'),
	        featuresMenuGroupElTitle = document.createElement('div');
	    featuresMenuGroupElTitle.setAttribute('class', 'features-menu-group-title');
	    featuresMenuGroupElTitle.innerText = featureGroup.group;
	    featuresMenuGroupEl.setAttribute('class', 'features-menu-group');
	    featuresMenuGroupEl.appendChild(featuresMenuGroupElTitle);
	    return featuresMenuGroupEl;
	}

	function registerFeatureMenuLinkToGroup(feature, featuresMenuGroupEl, state) {
	    var featuresMenuLinkEl = document.createElement('a');
	    featuresMenuLinkEl.innerText = feature.title;
	    featuresMenuLinkEl.setAttribute('class', 'features-menu-group-link');
	    featuresMenuLinkEl.setAttribute('target', state.index++);
	    featuresMenuGroupEl.appendChild(featuresMenuLinkEl);
	    manageFeaturesMenuClick(featuresMenuLinkEl);
	}

	function manageFeaturesMenuClick(featuresMenuLinkEl) {
	    featuresMenuLinkEl.addEventListener('click', (e) => {
	        var featuresMenuLinkEl = e.target,
	            featuresContentElId = 'feature-' + featuresMenuLinkEl.getAttribute('target'),
	            featureContentEl = document.getElementById(featuresContentElId),
	            featureContentStyle = featureContentEl.style,
	            noFeaturesContentMessageEl = document.getElementById('no-features-content-message');
	        manageFeaturesMenuLinkElVisibility( featureContentEl, featureContentStyle,
	            featuresMenuLinkEl, noFeaturesContentMessageEl);
	    });
	}

	function manageFeaturesMenuLinkElVisibility(featureContentEl, featureContentStyle,
	                                            featuresMenuLinkEl, noFeaturesContentMessageEl) {
	    if(featureContentEl.offsetParent === null) {
	        showFeaturesMenuLinkEl(featureContentStyle, featuresMenuLinkEl, noFeaturesContentMessageEl);
	    } else {
	        hideFeaturesMenuLinkEl(featureContentStyle, featuresMenuLinkEl, noFeaturesContentMessageEl);
	    }
	}

	function showFeaturesMenuLinkEl(featureContentStyle, featuresMenuLinkEl, noFeaturesContentMessageEl) {
	    featureContentStyle.display = 'block';
	    var oldFeaturesMenuLinkElActive = document.getElementsByClassName('is-active')[0];
	    if(oldFeaturesMenuLinkElActive) {
	        hideOldFeaturesContentEl(oldFeaturesMenuLinkElActive);
	    }
	    featuresMenuLinkEl.classList.add('is-active');
	    noFeaturesContentMessageEl.style.display = 'none';
	}

	function hideOldFeaturesContentEl(oldFeaturesMenuLinkElActive) {
	    oldFeaturesMenuLinkElActive.classList.remove('is-active');
	    var oldFeaturesContentElId = 'feature-' + oldFeaturesMenuLinkElActive.getAttribute('target'),
	        oldFeaturesContentEl = document.getElementById(oldFeaturesContentElId);
	    oldFeaturesContentEl.style.display = 'none';
	}

	function hideFeaturesMenuLinkEl(featureContentStyle, featuresMenuLinkEl, noFeaturesContentMessageEl) {
	    featureContentStyle.display = 'none';
	    featuresMenuLinkEl.classList.remove('is-active');
	    noFeaturesContentMessageEl.style.display = 'block';
	}

	function registerFeaturesContent(features) {
	    var featuresContentEl = document.createElement('features-content'),
	        state = { index: 0 };
	    features.forEach((featureTemplateGroup) => {
	        registerFeatureGroup(   featureTemplateGroup.group, featureTemplateGroup.features,
	            featuresContentEl, state);
	    });
	    document.body.appendChild(featuresContentEl);
	}

	function registerFeatureGroup(groupTitle, features, featuresContentEl, state) {
	    features.forEach((featureTemplate) => {
	        featuresContentEl.innerHTML +=
	            '<feature-content id="feature-' + (state.index++) + '" class="feature-content">' +
	            '<h1>' + groupTitle + ' - ' + featureTemplate.title + '</h1>' +
	            req('./features/' + featureTemplate.path) +
	            '</feature-content>';
	    });
	}

	function registerNoFeaturesContentMessage() {
	    var noFeaturesContentMessageEl = document.createElement('div');
	    noFeaturesContentMessageEl.setAttribute('id', 'no-features-content-message');
	    noFeaturesContentMessageEl.innerText = 'Please select a feature from the menu';
	    document.body.appendChild(noFeaturesContentMessageEl);
	}

	module.exports = {

	    registerFeaturesMenu: function registerFeaturesMenu(features) {
	        var featuresMenuEl = document.createElement('features-menu'),
	            state = { index: 0 };
	        //features.forEach((featureGroup) => {
	        //    this.registerFeatureMenu(featureGroup, featuresMenuEl, state);
	        //});
	        this.registerFeatureMenu();
	        document.body.appendChild(featuresMenuEl);
	    },

	    registerFeatureMenu: function registerFeatureMenu(featureGroup, featuresMenuEl, state) {
	        var featuresMenuGroupEl = createFeatureGroupEl(featureGroup);
	        featureGroup.features.forEach((feature) => {
	            registerFeatureMenuLinkToGroup(feature, featuresMenuGroupEl, state);
	        });
	        featuresMenuEl.appendChild(featuresMenuGroupEl);
	    },

	    createFeatureGroupEl: createFeatureGroupEl,
	    registerFeatureMenuLinkToGroup: registerFeatureMenuLinkToGroup,
	    manageFeaturesMenuClick: manageFeaturesMenuClick,
	    manageFeaturesMenuLinkElVisibility: manageFeaturesMenuLinkElVisibility,
	    showFeaturesMenuLinkEl: showFeaturesMenuLinkEl,
	    hideOldFeaturesContentEl: hideOldFeaturesContentEl,
	    hideFeaturesMenuLinkEl: hideFeaturesMenuLinkEl,
	    registerFeaturesContent: registerFeaturesContent,
	    registerFeatureGroup: registerFeatureGroup,
	    registerNoFeaturesContentMessage: registerNoFeaturesContentMessage
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./features/arrowFunctions/expressionBodies.html": 3,
		"./features/arrowFunctions/lexicalThis.html": 4,
		"./features/arrowFunctions/statementBodies.html": 5,
		"./features/classes/classDefinition.html": 6,
		"./features/classes/classInheritance.html": 7,
		"./features/classes/getterSetter.html": 8,
		"./features/constants/constants.html": 9,
		"./features/destructuringAssignment/parameterContextMatching.html": 10,
		"./features/enhancedObjectProperties/computedPropertyNames.html": 11,
		"./features/enhancedObjectProperties/methodProperties.html": 12,
		"./features/enhancedObjectProperties/propertyShorthand.html": 13,
		"./features/extendedParameterHandling/defaultParameterValues.html": 14,
		"./features/extendedParameterHandling/restParameter.html": 15,
		"./features/extendedParameterHandling/spreadOperator.html": 16,
		"./features/generators/function.html": 17,
		"./features/mapSet/setDataStructure.html": 18,
		"./features/modules/defaultAndWildcard.html": 19,
		"./features/modules/valueExportImport.html": 20,
		"./features/templateLiterals/stringInterpolation.html": 21,
		"./index.html": 22
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
	webpackContext.id = 2;


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    //The left part of the arrow represents the fn arguments, and the right part, the return statement\r\n    odds  = evens.map(v => v + 1), //single argument, returns a primitive\r\n    pairs = evens.map(v => ({ even: v, odd: v + 1 })), //single argument, returns an object\r\n    nums  = evens.map((v, i) => v + i) //multiple arguments, return a primitive\r\n</pre>\r\n<pre data-language=\"javascript\"  data-es5>\r\n    odds  = evens.map(function (v) { return v + 1 }),\r\n    pairs = evens.map(function (v) { return { even: v, odd: v + 1 } }),\r\n    nums  = evens.map(function (v, i) { return v + i })\r\n</pre>";

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    //As we're not explicitely definiing any callback function,\r\n    //we don't need to save the reference to 'this'\r\n    this.nums.forEach((v) => {\r\n        if (v % 5 === 0)\r\n            this.fives.push(v)\r\n    })\r\n</pre>\r\n<pre data-language=\"javascript\" data-es5>\r\n    var self = this\r\n    this.nums.forEach(function (v) {\r\n        if (v % 5 === 0)\r\n            self.fives.push(v)\r\n    })\r\n</pre>";

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    //Here the right side of the arrow is a function (Interestingly wrapped by curly bracets)\r\n    //I guess the 'return' statement will be still valid here\r\n    nums.forEach(v => {\r\n        if (v % 5 === 0) {\r\n            fives.push(v)\r\n        }\r\n    })\r\n</pre>";

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    class Shape {\r\n        constructor (id, x, y) {\r\n            this.id = id\r\n            this.move(x, y)\r\n        }\r\n        move (x, y) {\r\n            this.x = x\r\n            this.y = y\r\n        }\r\n    }\r\n</pre>\r\n<pre data-language=\"javascript\" data-es5>\r\n    var Shape = function (id, x, y) {\r\n        this.id = id;\r\n        this.move(x, y);\r\n    };\r\n    Shape.prototype.move = function (x, y) {\r\n        this.x = x;\r\n        this.y = y;\r\n    };\r\n</pre>";

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    //Classes can extend other classes, as we used to do with Object.create\r\n    class Rectangle extends Shape {\r\n        constructor (id, x, y, width, height) {\r\n            super(id, x, y) //calls the constructor of the 'super' == parent classes\r\n            //This is overriding the width & height props following classical prototypical inheritance\r\n            this.width  = width\r\n            this.height = height\r\n        }\r\n    }\r\n    class Circle extends Shape {\r\n        constructor (id, x, y, radius) {\r\n            super(id, x, y)\r\n            //This is adding a new property to the Circle class, not available on the parent (Shape) class\r\n            this.radius = radius\r\n        }\r\n    }\r\n</pre>\r\n<pre data-language=\"javascript\" data-es5>\r\n    var Rectangle = function (id, x, y, width, height) {\r\n        Shape.call(this, id, x, y);\r\n        this.width  = width;\r\n        this.height = height;\r\n    };\r\n    Rectangle.prototype = Object.create(Shape.prototype);\r\n    Rectangle.prototype.constructor = Rectangle;\r\n    var Circle = function (id, x, y, radius) {\r\n        Shape.call(this, id, x, y);\r\n        this.radius = radius;\r\n    };\r\n    Circle.prototype = Object.create(Shape.prototype);\r\n    Circle.prototype.constructor = Circle;\r\n</pre>";

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    class Rectangle {\r\n        constructor (width, height) {\r\n            this._width  = width\r\n            this._height = height\r\n        }\r\n        //Now it is possible to define the getters and setters directly as part of the class\r\n        set width  (width)  { this._width = width               }\r\n        get width  ()       { return this._width                }\r\n        set height (height) { this._height = height             }\r\n        get height ()       { return this._height               }\r\n        get area   ()       { return this._width * this._height }\r\n    }\r\n    var r = new Rectangle(50, 20)\r\n    r.area === 1000\r\n</pre>\r\n<pre data-language=\"javascript\" data-es5>\r\n    var Rectangle = function (width, height) {\r\n        this._width  = width;\r\n        this._height = height;\r\n    };\r\n    Rectangle.prototype = {\r\n        set width  (width)  { this._width = width;               },\r\n        get width  ()       { return this._width;                },\r\n        set height (height) { this._height = height;             },\r\n        get height ()       { return this._height;               },\r\n        get area   ()       { return this._width * this._height; }\r\n    };\r\n    var r = new Rectangle(50, 20);\r\n    r.area === 1000;\r\n</pre>";

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    const PI = 3.141593\r\n    //PI is unmutable, so further updates on its value will be ignored.\r\n    //Notice: this only makes the variable itself immutable, not its assigned content\r\n    //(for instance, in case the content is an object, this means the object itself can still be altered).\r\n</pre>";

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    //It's not just possible to initialise variables, as we saw before,\r\n    //but also to destructure arrays and objects into individual objects during function calls\r\n    function f ([ name, val ]) {\r\n        console.log(name, val)\r\n    }\r\n    function g ({ name: n, val: v }) {\r\n        console.log(n, v)\r\n    }\r\n    function h ({ name, val }) {\r\n        console.log(name, val)\r\n    }\r\n    f([ \"bar\", 42 ])\r\n    g({ name: \"foo\", val:  7 })\r\n    h({ name: \"bar\", val: 42 })\r\n</pre>\r\n<pre data-language=\"javascript\" data-es5>\r\n    function f (arg) {\r\n        var name = arg[0]\r\n        var val  = arg[1]\r\n        console.log(name, val)\r\n    }\r\n    function g (arg) {\r\n        var n = arg.name\r\n        var v = arg.val\r\n        console.log(n, v)\r\n    }\r\n    function h (arg) {\r\n        var name = arg.name\r\n        var val  = arg.val\r\n        console.log(name, val)\r\n    }\r\n    f([ \"bar\", 42 ])\r\n    g({ name: \"foo\", val:  7 })\r\n    h({ name: \"bar\", val: 42 })\r\n    </pre>";

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    obj = {\r\n        foo: \"bar\",\r\n        [ \"prop_\" + foo() ]: 42 //This technique allows to define custom properties inline\r\n    }\r\n</pre>\r\n<pre data-language=\"javascript\" data-es5>\r\n    obj = {\r\n        foo: \"bar\"\r\n    }\r\n    obj[ \"prop_\" + foo() ] = 42\r\n</pre>";

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    obj = {\r\n        foo (a, b) { //regular function\r\n        },\r\n        *quux (x, y) { //generator function\r\n        }\r\n    }\r\n</pre>\r\n<pre data-language=\"javascript\" data-es5>\r\n    obj = {\r\n        foo: function (a, b) {\r\n        },\r\n        //  quux: no equivalent generator function in ES5\r\n    }\r\n</pre>";

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    obj = { x, y }\r\n</pre>\r\n<pre data-language=\"javascript\" data-es5>\r\n    obj = { x: x, y: y }\r\n</pre>";

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    //Clean. Obvious. Great.\r\n    function f (x, y = 7, z = 42) {\r\n        return x + y + z\r\n    }\r\n    f(1) === 50\r\n</pre>";

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    //a = [\"hello\", true, 7]\r\n    function f (x, y, ...a) {\r\n        return (x + y) * a.length\r\n    }\r\n    f(1, 2, \"hello\", true, 7) === 9\r\n</pre>";

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    //So using '...' is a way to manage serialised arguments\r\n    var params = [ \"hello\", true, 7 ]\r\n    var other = [ 1, 2, ...params ] // [ 1, 2, \"hello\", true, 7 ]\r\n    f(1, 2, ...params) === 9\r\n\r\n    var str = \"foo\"\r\n    //Those serialised arguments are translated into an array by just wrapping it\r\n    //so if a = 'foo', ...a = 'f','o','o', and then [...a] = ['f', 'o', 'o']\r\n    var chars = [ ...str ] // [ \"f\", \"o\", \"o\" ]\r\n</pre>";

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    function* range (start, end, step) {\r\n        while (start < end) {\r\n            yield start\r\n            start += step\r\n        }\r\n    }\r\n\r\n    for (let i of range(0, 10, 2)) {\r\n        console.log(i) // 0, 2, 4, 6, 8\r\n    }\r\n</pre>\r\n<pre data-language=\"javascript\" data-es5>\r\n    function range (start, end, step) {\r\n        var list = [];\r\n        while (start < end) {\r\n            list.push(start);\r\n            start += step;\r\n        }\r\n        return list;\r\n    }\r\n\r\n    var r = range(0, 10, 2);\r\n    for (var i = 0; i < r.length; i++) {\r\n        console.log(r[i]); // 0, 2, 4, 6, 8\r\n    }\r\n</pre>";

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    let s = new Set()\r\n    s.add(\"hello\").add(\"goodbye\").add(\"hello\")\r\n    s.size === 2\r\n    s.has(\"hello\") === true\r\n    for (let key of s.values()) // insertion order\r\n        console.log(key)\r\n</pre>\r\n<pre data-language=\"javascript\" data-es5>\r\n    var s = {};\r\n    s[\"hello\"] = true; s[\"goodbye\"] = true; s[\"hello\"] = true;\r\n    Object.keys(s).length === 2;\r\n    s[\"hello\"] === true;\r\n    for (var key in s) // arbitrary order\r\n        if (s.hasOwnProperty(key))\r\n            console.log(s[key]);\r\n</pre>";

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    //  lib/mathplusplus.js\r\n    //This is like tunneling all the variables from lib/math via lib/mathplusplus.js\r\n    export * from \"lib/math\"\r\n    export var e = 2.71828182846\r\n    export default (x) => Math.exp(x) //Here we export the default value of the mathplusplus module\r\n\r\n    //  someApp.js\r\n    //pi was originally exposed by lib/math, but exported again via mathplusplus\r\n    //as exp doesn't match with any variable of mathplusplus, it takes the default one\r\n    import exp, { pi, e } from \"lib/mathplusplus\"\r\n    console.log(\"e^{π} = \" + exp(pi))\r\n</pre>";

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    //  lib/math.js\r\n    export function sum (x, y) { return x + y } //Function available using import\r\n    export var pi = 3.141593 //Variable available using import\r\n\r\n    //  someApp.js\r\n    //Importing all the components from lib/math.js. Please note we need to define the placeholder with 'as'\r\n    import * as math from \"lib/math\"\r\n    console.log(\"2π = \" + math.sum(math.pi, math.pi))\r\n\r\n    //  otherApp.js\r\n    //Importing the function and the variable specifically the components from lib/math.js\r\n    import { sum, pi } from \"lib/math\"\r\n    console.log(\"2π = \" + sum(pi, pi))\r\n</pre>";

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = "<pre data-language=\"javascript\">\r\n    var customer = { name: \"Foo\" }\r\n    var card = { amount: 7, product: \"Bar\", unitprice: 42 }\r\n    message = `Hello ${customer.name},\r\n    want to buy ${card.amount} ${card.product} for\r\n    a total of ${card.amount * card.unitprice} bucks?`\r\n</pre>";

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "<html>\r\n    <head>\r\n        <link rel=\"stylesheet\" type=\"text/css\" href=\"./styles.css\">\r\n        <link href=\"../vendor/rainbow/github.css\" rel=\"stylesheet\" type=\"text/css\">\r\n    </head>\r\n    <body>\r\n\r\n        <script type=\"text/javascript\" src=\"../dist/bundle.js\"></script>\r\n\r\n        <script src=\"../vendor/rainbow/rainbow.min.js\"></script>\r\n        <script src=\"../vendor/rainbow/generic.js\"></script>\r\n        <script src=\"../vendor/rainbow/javascript.js\"></script>\r\n\r\n        <script src=\"http://localhost:35729/livereload.js\"></script>\r\n    </body>\r\n</html>";

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = {
	    getList: function () {
	        return [
	            {
	                group: 'Constants',
	                features: [
	                    { title: 'Constants', path: 'constants/constants.html' }
	                ]
	            }, {
	                group: 'Arrow functions',
	                features: [
	                    { title: 'Expression bodies', path: 'arrowFunctions/expressionBodies.html' },
	                    { title: 'Statement bodies', path: 'arrowFunctions/statementBodies.html' },
	                    { title: 'Lexical \'this\'', path: 'arrowFunctions/lexicalThis.html' }
	                ]
	            }, {
	                group: 'Extended parameter handling',
	                features: [
	                    { title: 'Default parameter values', path: 'extendedParameterHandling/defaultParameterValues.html' },
	                    { title: 'Rest paramete', path: 'extendedParameterHandling/restParameter.html' },
	                    { title: 'Spread operator', path: 'extendedParameterHandling/spreadOperator.html' }
	                ]
	            }, {
	                group: 'Template literals',
	                features: [
	                    { title: 'String interpolation', path: 'templateLiterals/stringInterpolation.html' }
	                ]
	            }, {
	                group: 'Enhanced object properties',
	                features: [
	                    { title: 'Property shorthand', path: 'enhancedObjectProperties/propertyShorthand.html' },
	                    { title: 'Computed property names', path: 'enhancedObjectProperties/computedPropertyNames.html' },
	                    { title: 'Method properties', path: 'enhancedObjectProperties/methodProperties.html' }
	                ]
	            }, {
	                group: 'Destructing assignment',
	                features: [
	                    { title: 'Parameter context matching', path: 'destructuringAssignment/parameterContextMatching.html' }
	                ]
	            }, {
	                group: 'Modules',
	                features: [
	                    { title: 'Value export / import', path: 'modules/valueExportImport.html' },
	                    { title: 'Default and wildcard', path: 'modules/defaultAndWildcard.html' }
	                ]
	            }, {
	                group: 'Classes',
	                features: [
	                    { title: 'Class definition', path: 'classes/classDefinition.html' },
	                    { title: 'Class inheritance', path: 'classes/classInheritance.html' },
	                    { title: 'Getter / setter', path: 'classes/getterSetter.html' }
	                ]
	            }, {
	                group: 'Generators',
	                features: [
	                    { title: 'Generator function, direct use', path: 'generators/function.html' }
	                ]
	            }, {
	                group: 'Map/set & weakMap/weakSet',
	                features: [
	                    { title: 'Set data-structure', path: 'mapSet/setDataStructure.html' }
	                ]
	            }
	        ];
	    }
	};

/***/ }
/******/ ]);