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
    registerNoFeaturesContentMessage();

    function registerFeaturesMenu(features) {
        var featuresMenuElement = document.createElement('features-menu');
        features.forEach(function (featureTemplate, index) {
            registerFeatureMenu(featureTemplate, featuresMenuElement, index);
        });
        document.body.appendChild(featuresMenuElement);
    }

    function registerFeatureMenu(featureTemplate, featuresMenuElement, index) {
        var featuresMenuLinkElement = document.createElement('a');
        featuresMenuLinkElement.innerText = featureTemplate.title;
        featuresMenuLinkElement.setAttribute('class', 'features-menu-link');
        featuresMenuLinkElement.setAttribute('target', index);
        featuresMenuElement.appendChild(featuresMenuLinkElement);
        manageFeaturesMenuClick(featuresMenuLinkElement);
    }

    function manageFeaturesMenuClick(featuresMenuLinkElement) {
        featuresMenuLinkElement.addEventListener('click', function (e) {
            var featuresMenuLinkElement = e.target,
                featuresContentElementId = 'feature-' + featuresMenuLinkElement.getAttribute('target'),
                featureContentElement = document.getElementById(featuresContentElementId),
                featureContentStyle = featureContentElement.style,
                noFeaturesContentMessageElement = document.getElementById('no-features-content-message');
            manageFeaturesMenuLinkElementVisibility(featureContentElement, featureContentStyle, featuresMenuLinkElement, noFeaturesContentMessageElement);
        });
    }

    function manageFeaturesMenuLinkElementVisibility(featureContentElement, featureContentStyle, featuresMenuLinkElement, noFeaturesContentMessageElement) {
        if(featureContentElement.offsetParent === null) {
            showFeaturesMenuLinkElement(featureContentStyle, featuresMenuLinkElement, noFeaturesContentMessageElement);
        } else {
            hideFeaturesMenuLinkElement(featureContentStyle, featuresMenuLinkElement, noFeaturesContentMessageElement);
        }
    }

    function showFeaturesMenuLinkElement(featureContentStyle, featuresMenuLinkElement, noFeaturesContentMessageElement) {
        featureContentStyle.display = 'block';
        var oldFeaturesMenuLinkElementActive = document.getElementsByClassName('is-active')[0];
        if(oldFeaturesMenuLinkElementActive) {
            hideOldFeaturesContentElement(oldFeaturesMenuLinkElementActive, oldFeaturesMenuLinkElementActive);
        }
        featuresMenuLinkElement.classList.add('is-active');
        noFeaturesContentMessageElement.style.display = 'none';
    }

    function hideOldFeaturesContentElement(oldFeaturesMenuLinkElementActive, oldFeaturesMenuLinkElementActive) {
        oldFeaturesMenuLinkElementActive.classList.remove('is-active');
        var oldFeaturesContentElementId = 'feature-' + oldFeaturesMenuLinkElementActive.getAttribute('target'),
            oldFeaturesContentElement = document.getElementById(oldFeaturesContentElementId);
        oldFeaturesContentElement.style.display = 'none';
    }

    function hideFeaturesMenuLinkElement(featureContentStyle, featuresMenuLinkElement, noFeaturesContentMessageElement) {
        featureContentStyle.display = 'none';
        featuresMenuLinkElement.classList.remove('is-active');
        noFeaturesContentMessageElement.style.display = 'block';
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

    function registerNoFeaturesContentMessage() {
        var noFeaturesContentMessageElement = document.createElement('div');
        noFeaturesContentMessageElement.setAttribute('id', 'no-features-content-message');
        noFeaturesContentMessageElement.innerText = 'Please select a feature from the menu';
        document.body.appendChild(noFeaturesContentMessageElement);
    }
})();