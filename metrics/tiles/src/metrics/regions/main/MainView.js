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

        getContainer: function () {
            return this.getElement().find(".eaLauncherTilesExample-Container");
        },

        getMessage: function () {
            return this.getElement().find(".eaLauncherTilesExample-Message");
        }

    });

});
