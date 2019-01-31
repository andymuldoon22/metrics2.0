define([
    'jscore/core',
    'text!./_main.html',
    'styles!./_main.less'
], function (core, template, styles) {

    return core.View.extend({

        getTemplate: function () {
            return template;
        },

        getStyle: function () {
            return styles;
        },

        getTopDiv: function () {
            return this.getElement().find('.eaDashboard-rMain-top');
        },
        getContentDiv: function () {
            return this.getElement().find('.eaDashboard-rMain-content');
        },

        getTableDiv: function () {
            return this.getElement().find('.eaDashboard-rMain-right-table');
        },
        getCarouselDiv: function () {
            return this.getElement().find('.eaDashboard-rMain-left-carousel');
        }
    });

});
