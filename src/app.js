(function () {

    var req = require.context("html!./", true, /^\.\/.*\.html/),
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