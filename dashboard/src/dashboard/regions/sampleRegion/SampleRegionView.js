define([
    'jscore/core',
    'template!./_sampleRegion.hbs',
    'styles!./_sampleRegion.less'
], function (core, template, styles) {

    return core.View.extend({

        getTemplate: function () {
            return template(this.options);
        },

        getStyle: function () {
            return styles;
        }

    });

});
