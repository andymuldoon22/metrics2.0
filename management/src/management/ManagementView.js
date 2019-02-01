define([
    'jscore/core',
    'text!./management.html',
], function (core, template) {
    'use strict';

    return core.View.extend({

        getTemplate: function () {
            return template;
        },

        getMain: function () {
            return this.getElement().find('.eaManagement-main');
        }

    });

});
