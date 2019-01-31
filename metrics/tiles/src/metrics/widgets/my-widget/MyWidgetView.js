define([
    'jscore/core',
    'text!./_myWidget.html',
    'styles!./_myWidget.less'
], function (core, template, styles) {
    'use strict';

    var _prefix = '.eaLauncherTilesExample-Controls';

    return core.View.extend({

        getTemplate: function () {
            return template;
        },

        getStyle: function () {
            return styles;
        },
        
        getFavourites: function () {
            return this.getElement().find(_prefix + '-FavoritesGroup');
        },

    });

});
