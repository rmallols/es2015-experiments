var domBuilder = require('./domBuilder'),
    features = require('./features/features');

module.exports = {
    init: function () {
        var featuresList = features.getList();
        domBuilder.registerFeaturesMenu(featuresList);
        domBuilder.registerFeaturesContent(featuresList);
        domBuilder.registerNoFeaturesContentMessage();
    }
};