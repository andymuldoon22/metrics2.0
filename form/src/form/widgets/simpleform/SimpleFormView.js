/*global define*/
define([
    'jscore/core',
    'template!./_simpleForm.hbs',
    'styles!./_simpleForm.less'
], function (core, template, styles) {
    'use strict';

    var className = 'eaSimplevalidation-wSimpleForm',
        _prefix = '.' + className;

    return core.View.extend({

        getTemplate: function () {
            return template(this.options);
        },
        getStyle: function () {
            return styles;
        },
        getForm: function () {
            console.log(this.getElement().find(_prefix + '-form'));
            return this.getElement().find(_prefix + '-form');
        },
        getSaveBtn: function () {
            return this.getElement().find(_prefix + '-saveBtn');
        }
    });

    function myFunction () {
        console.log('button pressed 1');

    };

});