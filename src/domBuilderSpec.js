describe('domBuilderSpec', function () {

    var domBuilder = require('./domBuilder');

    describe('registerFeaturesMenu', function () {

        it('adds the different features to the DOM', function () {

            given:
                spyOn(document, 'createElement').and.returnValue('featuresMenuEl');
                spyOn(document.body, 'appendChild');
                spyOn(domBuilder, 'registerFeatureMenu');

            when:
                domBuilder.registerFeaturesMenu(['a', 'b']);

            then:
                expect(document.createElement).toHaveBeenCalledWith('features-menu');
                expect(document.body.appendChild).toHaveBeenCalledWith('featuresMenuEl');

            and:
                expect(domBuilder.registerFeatureMenu.calls.count()).toBe(2);
                expect(domBuilder.registerFeatureMenu).toHaveBeenCalledWith('a', 'featuresMenuEl', { index: 0 });
                expect(domBuilder.registerFeatureMenu).toHaveBeenCalledWith('b', 'featuresMenuEl', { index: 0 });
        });
    });

    describe('registerFeatureMenu', function () {

        it('adds a specific features to a memory object', function () {

            var featuresMenuEl = {
                appendChild: function() {}
            };

            given:
                spyOn(domBuilder, 'createFeatureGroupEl').and.returnValue('featuresMenuGroupEl');
                spyOn(domBuilder, 'registerFeatureMenuLinkToGroup');
                spyOn(featuresMenuEl, 'appendChild');

            when:
                domBuilder.registerFeatureMenu({ features: ['a', 'b']}, featuresMenuEl, 'state');

            then:
                expect(domBuilder.registerFeatureMenuLinkToGroup.calls.count()).toBe(2);
                expect(domBuilder.registerFeatureMenuLinkToGroup).toHaveBeenCalledWith('a', 'featuresMenuGroupEl', 'state');
                expect(domBuilder.registerFeatureMenuLinkToGroup).toHaveBeenCalledWith('b', 'featuresMenuGroupEl', 'state');
                expect(featuresMenuEl.appendChild).toHaveBeenCalledWith('featuresMenuGroupEl');
        });
    });

    describe('createFeatureGroupEl', function () {

        it('returns a DOM element with the given feature element', function () {

            var DOMNode = {
                setAttribute: function () {},
                appendChild: function () {}
            };

            given:
                spyOn(document, 'createElement').and.returnValue(DOMNode);
                spyOn(DOMNode, 'setAttribute');
                spyOn(DOMNode, 'appendChild');

            when:
                domBuilder.createFeatureGroupEl({ group: 'group'});

            then:
                expect(DOMNode.setAttribute).toHaveBeenCalledWith('class', 'features-menu-group-title');
                expect(DOMNode.setAttribute).toHaveBeenCalledWith('class', 'features-menu-group');
                expect(DOMNode.appendChild).toHaveBeenCalledWith(DOMNode);
                expect(DOMNode.innerText).toBe('group');
        });
    });
});