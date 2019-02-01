define([
    'jscore/core',
    './MyWidgetView',
    'i18n!metrics/dictionary.json'
], function (core, View, Dictionary) {
    'use strict';

    /**
     * Basic widget template.
     *
     * Create your custom template in seconds using the live template feature provided by different tools.
     */

    return core.Widget.extend({

        View: View,

        onViewReady: function () {
            var viewElt = this.view;
            var favoritesGroup = viewElt.getFavourites();
            // favoritesGroup.forEach(function(radio){
            //     radio.addEventHandler("click", function(){
            //         this.trigger(this.VIEW_CHANGE);
            //     }.bind(this));
            // }.bind(this));
        },

                /**
         * Clean up
         * @method onDestroy
         */
        onDestroy: function () {
            this.view.destroy(); // widgets with uit views should call view.destroy()
        },

        /**
         * Is the display switcher set to show only favorite apps?
         * @returns {boolean} true if set to show only favorites
         */
        isShowOnlyFavorites: function() {
            var view = this.getDisplayView();
            return view === "favorites";
        },

        /**
         * Get current setting of display switcher
         * @returns {String} favorites | all
         */
        getDisplayView: function() {
            return this.view.getElement().find(".eaLauncherTilesExample-Controls-FavoritesGroup").find("input:checked").getValue();
        },

        /**
         * Set the display switcher
         * @param {String} displayView - favorites | all
         */
        setDisplayView: function(displayView) {
            var choice = this.view.getElement().find(".eaLauncherTilesExample-Controls-FavoritesGroup input[value='" + displayView + "']");
            if (choice) {
                choice.setProperty("checked", true);
            }
        },

        /**
         * Update the app count shown out of total
         * @param {integer} numApps - number of apps showing
         * @param {integer} totalApps - total number of apps
         */
        setAppCount: function(numApps, totalApps) {
            var viewElt = this.view.getElement();
            viewElt.find(".eaLauncherTilesExample-Controls-AppCount").setText(11
                // replaceParams(Dictionary.get('countOfTotal'), {"count":numApps, "total":totalApps})
            );
        }

    });

});
