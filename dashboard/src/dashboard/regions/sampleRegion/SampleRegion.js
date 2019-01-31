define([
    'jscore/core',
    './SampleRegionView',
    'i18n!dashboard/dictionary.json'
], function (core, View, dictionary) {

    return core.Region.extend({

        id: 'SampleRegion',

        view: function () {
            return new View({i18n: dictionary});
        },

        onStart: function () {

        }

    });

});
