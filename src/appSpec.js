describe('app', function () {

    var domBuilder = require('./domBuilder'),
        features = require('./features/features');

    it('registers the features menu, content and the no-empty message', function () {

        given:
            spyOn(features, 'getList').and.returnValue('list');
            spyOn(domBuilder, 'registerFeaturesMenu');
            spyOn(domBuilder, 'registerFeaturesContent');
            spyOn(domBuilder, 'registerNoFeaturesContentMessage');

        when:
            require('./app');

        then:
            expect(domBuilder.registerFeaturesMenu).toHaveBeenCalledWith('list');
            expect(domBuilder.registerFeaturesContent).toHaveBeenCalledWith('list');
            expect(domBuilder.registerNoFeaturesContentMessage).toHaveBeenCalled();
    });
});



