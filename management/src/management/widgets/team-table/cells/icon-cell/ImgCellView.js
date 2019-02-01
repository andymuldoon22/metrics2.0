/*global define*/
define([
    'jscore/core',
    'template!./_imgCell.hbs'
], function (core, template) {
    'use strict';

    return core.View.extend({

        getTemplate: function () {
            return template(this.options);
        }

    });
});
