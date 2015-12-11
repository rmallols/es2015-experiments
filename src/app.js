var domBuilder = require('./domBuilder'),
    features = require('./features/features'),
    bootstrap = function () {
        var featuresList = features.getList();
        domBuilder.registerFeaturesMenu(featuresList);
        domBuilder.registerFeaturesContent(featuresList);
        domBuilder.registerNoFeaturesContentMessage();
    };

    bootstrap();

module.exports = bootstrap;
