(function () {

    var req = require.context("html!./", true, /^\.\/.*\.html/),
        features = [
            {
                group: 'Constants',
                features: [
                    { title: 'Constants', path: './constants/constants.html' }
                ]
            }, {
                group: 'Arrow functions',
                features: [
                    { title: 'Expression bodies', path: './arrowFunctions/expressionBodies.html' },
                    { title: 'Statement bodies', path: './arrowFunctions/statementBodies.html' },
                    { title: 'Lexical \'this\'', path: './arrowFunctions/lexicalThis.html' }
                ]
            }, {
                group: 'Extended parameter handling',
                features: [
                    { title: 'Default parameter values', path: './extendedParameterHandling/defaultParameterValues.html' },
                    { title: 'Rest paramete', path: './extendedParameterHandling/restParameter.html' },
                    { title: 'Spread operator', path: './extendedParameterHandling/spreadOperator.html' }
                ]
            }, {
                group: 'Template literals',
                features: [
                    { title: 'String interpolation', path: './templateLiterals/stringInterpolation.html' }
                ]
            }, {
                group: 'Enhanced object properties',
                features: [
                    { title: 'Property shorthand', path: './enhancedObjectProperties/propertyShorthand.html' },
                    { title: 'Computed property names', path: './enhancedObjectProperties/computedPropertyNames.html' },
                    { title: 'Method properties', path: './enhancedObjectProperties/methodProperties.html' }
                ]
            }, {
                group: 'Destructing assignment',
                features: [
                    { title: 'Parameter context matching', path: './destructuringAssignment/parameterContextMatching.html' }
                ]
            }, {
                group: 'Modules',
                features: [
                    { title: 'Value export / import', path: './modules/valueExportImport.html' },
                    { title: 'Default and wildcard', path: './modules/defaultAndWildcard.html' }
                ]
            }, {
                group: 'Classes',
                features: [
                    { title: 'Class definition', path: './classes/classDefinition.html' },
                    { title: 'Class inheritance', path: './classes/classInheritance.html' }
                ]
            }
        ];

    registerFeaturesMenu(features);
    registerFeaturesContent(features);
    registerNoFeaturesContentMessage();

    function registerFeaturesMenu(features) {
        var featuresMenuElement = document.createElement('features-menu');
        features.forEach(function (featureGroup, index) {
            registerFeatureMenu(featureGroup, featuresMenuElement, index);
        });
        document.body.appendChild(featuresMenuElement);
    }

    function registerFeatureMenu(featureGroup, featuresMenuElement, featureGroupIndex) {
        var featuresMenuGroupElement = document.createElement('div'),
            featuresMenuGroupElementTitle = document.createElement('div');
        featuresMenuGroupElementTitle.setAttribute('class', 'features-menu-group-title');
        featuresMenuGroupElementTitle.innerText = featureGroup.group;
        featuresMenuGroupElement.setAttribute('class', 'features-menu-group');
        featuresMenuGroupElement.appendChild(featuresMenuGroupElementTitle);
        featureGroup.features.forEach(function (feature, featureIndex) {
            registerFeatureMenuLinkToGroup(feature, featuresMenuGroupElement, featureGroupIndex, featureIndex);
        });
        featuresMenuElement.appendChild(featuresMenuGroupElement);
    }

    function registerFeatureMenuLinkToGroup(feature, featuresMenuGroupElement, featureGroupIndex, featureIndex) {
        var featuresMenuLinkElement = document.createElement('a');
        featuresMenuLinkElement.innerText = feature.title;
        featuresMenuLinkElement.setAttribute('class', 'features-menu-group-link');
        featuresMenuLinkElement.setAttribute('target', featureGroupIndex + featureIndex);
        featuresMenuGroupElement.appendChild(featuresMenuLinkElement);
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
        features.forEach(function (featureTemplateGroup, groupTitleIndex) {
            var groupTitle = featureTemplateGroup.group;
            featureTemplateGroup.features.forEach(function (featureTemplate, featureTitleIndex) {
                featuresContentElement.innerHTML +=  '<feature-content id="feature-' + (groupTitleIndex + featureTitleIndex) + '" class="feature-content">' +
                                                        '<h1>' + groupTitle + ' - ' + featureTemplate.title + '</h1>' +
                                                        req(featureTemplate.path) +
                                                    '</feature-content>';
            });
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