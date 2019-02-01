/*global define*/
define([
    'jscore/core',
    'formvalidator/Validator',
    './SimpleFormView',
    'i18n!simplevalidation/dictionary.json'
], function (core, Validator, 
    View, dictionary) {
    'use strict';

    return core.Widget.extend({

        view: function () {
            return new View({
                register: dictionary.get('register'),
                teamName: dictionary.get('teamName.label'),
                name: dictionary.get('name.label'),
                sprint: dictionary.get('sprint.label'),
                save: dictionary.get('button.save'),
            });
        },

        onViewReady: function () {
            var formAValidator = new Validator({
                element: this.view.getForm(),
                fields: {
                    // css selector for existing child element of the form
                    '.eaSimplevalidation-wSimpleForm-login': {
                        // shortcut to set the attributes
                        placeholder: dictionary.get('teamName.placeholder'),
                        required: true,

                        // default messages
                        messages: {
                            error: dictionary.get('teamName.error')
                        }
                    },
                    '.eaSimplevalidation-wSimpleForm-name': {
                        placeholder: dictionary.get('name.placeholder')
                    },
                    // css selector for existing child element of the form
                    '.eaSimplevalidation-wSimpleForm-email': {
                        // shortcut to set the attributes
                        placeholder: dictionary.get('sprint.placeholder'),
                        required: true,
                        type: 'sprint',

                        // default messages
                        messages: {
                            error: dictionary.get('sprint.error')
                        }
                    }
                }
            });
            var that = this;
            this.view.getSaveBtn().addEventHandler('click', function () {
                // checkValidity runs the validation for all the fields
                // then will call success or error callback
                console.log(that);
                that.view.getForm();
                formAValidator.checkValidity({
                    success: function () {
                        
                        
                        alert(dictionary.get('validate.success'));
                    },
                    error: function (arr) {
                        alert(dictionary.get('validate.error') + '\n' + (arr.toString().replace(/,/g, '\n')));
                    }
                });
            });
        },

        myFunction: function (){
            console.log('button pressed');
        }
    });

    function myFunction () {
        console.log('button pressed 1');

    };
});
