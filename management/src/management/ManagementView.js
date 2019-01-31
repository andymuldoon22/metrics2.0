define([
    'jscore/core',
    'text!./management.html',
    'styles!./management.less'
], function (core, template, styles) {
    'use strict';

    return core.View.extend({

        getTemplate: function () {
            return template;
        },

        getStyle: function () {
            return styles;
        },

        getMain: function () {
            return this.getElement().find('.eaWidget_events-main');
        }

    });

});
