define([
    "jscore/core",
    "template!./_settings.hbs",
    "styles!./_settings.less",
], function (core, template, style) {

    return core.View.extend({

        getTemplate: function () {
            return template(this.options);
        },

        getStyle: function () {
            return style;
        },

        getTextArea: function () {
            return this.getElement().find('.eaDashboard-sampleWidget-settings-text');
        },

        getInput: function () {
            return this.getElement().find('.ebInput');
        },

        getApplyButton: function () {
            return this.getElement().find('.eaDashboard-sampleWidget-settings-apply');
        }

    });

});
