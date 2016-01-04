var req = require.context("html!./", true, /^\.\/.*\.html/);

module.exports = {

    registerFeaturesMenu: function (features) {
        var featuresMenuEl = document.createElement('features-menu'),
            state = { index: 0 };
        features.forEach((featureGroup) => {
            this.registerFeatureMenu(featureGroup, featuresMenuEl, state);
        });
        document.body.appendChild(featuresMenuEl);
    },

    registerFeatureMenu: function (featureGroup, featuresMenuEl, state) {
        var featuresMenuGroupEl = this.createFeatureGroupEl(featureGroup);
        featureGroup.features.forEach((feature) => {
            this.registerFeatureMenuLinkToGroup(feature, featuresMenuGroupEl, state);
        });
        featuresMenuEl.appendChild(featuresMenuGroupEl);
    },

    createFeatureGroupEl: function (featureGroup) {
        var featuresMenuGroupEl = document.createElement('div'),
            featuresMenuGroupElTitle = document.createElement('div');
        featuresMenuGroupElTitle.setAttribute('class', 'features-menu-group-title');
        featuresMenuGroupElTitle.innerText = featureGroup.group;
        featuresMenuGroupEl.setAttribute('class', 'features-menu-group');
        featuresMenuGroupEl.appendChild(featuresMenuGroupElTitle);
        return featuresMenuGroupEl;
    },

    registerFeatureMenuLinkToGroup: function (feature, featuresMenuGroupEl, state) {
        var featuresMenuLinkEl = document.createElement('a');
        featuresMenuLinkEl.innerText = feature.title;
        featuresMenuLinkEl.setAttribute('class', 'features-menu-group-link');
        featuresMenuLinkEl.setAttribute('target', state.index++);
        featuresMenuGroupEl.appendChild(featuresMenuLinkEl);
        this.manageFeaturesMenuClick(featuresMenuLinkEl);
    },

    manageFeaturesMenuClick: function (featuresMenuLinkEl) {
        featuresMenuLinkEl.addEventListener('click', (e) => {
            var featuresMenuLinkEl = e.target,
                featuresContentElId = 'feature-' + featuresMenuLinkEl.getAttribute('target'),
                featureContentEl = document.getElementById(featuresContentElId),
                featureContentStyle = featureContentEl.style,
                noFeaturesContentMessageEl = document.getElementById('no-features-content-message');
            this.manageFeaturesMenuLinkElVisibility( featureContentEl, featureContentStyle,
                featuresMenuLinkEl, noFeaturesContentMessageEl);
        });
    },

    manageFeaturesMenuLinkElVisibility: function (featureContentEl, featureContentStyle,
                                                  featuresMenuLinkEl, noFeaturesContentMessageEl) {
        if(featureContentEl.offsetParent === null) {
            this.showFeaturesMenuLinkEl(featureContentStyle, featuresMenuLinkEl, noFeaturesContentMessageEl);
        } else {
            this.hideFeaturesMenuLinkEl(featureContentStyle, featuresMenuLinkEl, noFeaturesContentMessageEl);
        }
    },

    showFeaturesMenuLinkEl: function (featureContentStyle, featuresMenuLinkEl, noFeaturesContentMessageEl) {
        featureContentStyle.display = 'block';
        var oldFeaturesMenuLinkElActive = document.getElementsByClassName('is-active')[0];
        if(oldFeaturesMenuLinkElActive) {
            this.hideOldFeaturesContentEl(oldFeaturesMenuLinkElActive);
        }
        featuresMenuLinkEl.classList.add('is-active');
        noFeaturesContentMessageEl.style.display = 'none';
    },

    hideOldFeaturesContentEl: function (oldFeaturesMenuLinkElActive) {
        oldFeaturesMenuLinkElActive.classList.remove('is-active');
        var oldFeaturesContentElId = 'feature-' + oldFeaturesMenuLinkElActive.getAttribute('target'),
            oldFeaturesContentEl = document.getElementById(oldFeaturesContentElId);
        oldFeaturesContentEl.style.display = 'none';
    },

    hideFeaturesMenuLinkEl: function (featureContentStyle, featuresMenuLinkEl, noFeaturesContentMessageEl) {
        featureContentStyle.display = 'none';
        featuresMenuLinkEl.classList.remove('is-active');
        noFeaturesContentMessageEl.style.display = 'block';
    },

    registerFeaturesContent: function (features) {
        var featuresContentEl = document.createElement('features-content'),
            state = { index: 0 };
        features.forEach((featureTemplateGroup) => {
            this.registerFeatureGroup(featureTemplateGroup.group, featureTemplateGroup.features,
                                      featuresContentEl, state);
        });
        document.body.appendChild(featuresContentEl);
    },

    registerFeatureGroup: function (groupTitle, features, featuresContentEl, state) {
        features.forEach((featureTemplate) => {
            featuresContentEl.innerHTML +=
                '<feature-content id="feature-' + (state.index++) + '" class="feature-content">' +
                '<h1>' + groupTitle + ' - ' + featureTemplate.title + '</h1>' +
                req('./features/' + featureTemplate.path) +
                '</feature-content>';
        });
    },

    registerNoFeaturesContentMessage: function () {
        var noFeaturesContentMessageEl = document.createElement('div');
        noFeaturesContentMessageEl.setAttribute('id', 'no-features-content-message');
        noFeaturesContentMessageEl.innerText = 'Please select a feature from the menu';
        document.body.appendChild(noFeaturesContentMessageEl);
    }
};