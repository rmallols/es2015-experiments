(function () {

    var req = require.context("html!./", true, /^\.\/.*\.html/),
        features = require('./features');

    registerFeaturesMenu(features);
    registerFeaturesContent(features);
    registerNoFeaturesContentMessage();

    function registerFeaturesMenu(features) {
        var featuresMenuEl = document.createElement('features-menu'),
            state = { index: 0 };
        features.forEach((featureGroup) => {
            registerFeatureMenu(featureGroup, featuresMenuEl, state);
        });
        document.body.appendChild(featuresMenuEl);
    }

    function registerFeatureMenu(featureGroup, featuresMenuEl, state) {
        var featuresMenuGroupEl = createFeatureGroupEl(featureGroup);
        featureGroup.features.forEach((feature) => {
            registerFeatureMenuLinkToGroup(feature, featuresMenuGroupEl, state);
        });
        featuresMenuEl.appendChild(featuresMenuGroupEl);
    }

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
                    req(featureTemplate.path) +
                '</feature-content>';
        });
    }

    function registerNoFeaturesContentMessage() {
        var noFeaturesContentMessageEl = document.createElement('div');
        noFeaturesContentMessageEl.setAttribute('id', 'no-features-content-message');
        noFeaturesContentMessageEl.innerText = 'Please select a feature from the menu';
        document.body.appendChild(noFeaturesContentMessageEl);
    }
})();