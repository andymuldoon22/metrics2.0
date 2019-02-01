define([
    'jscore/core',
    'layouts/LauncherTiles',
    'dashboard/Dashboard',
    'i18n!metrics/dictionary.json',
    './regions/main/Main'
], function (core,Dashboard, LauncherTiles, dictionary, Main) {
    'use strict';

    return core.App.extend({

        /**
         * Called when the app is first instantiated in the current tab for the first time.
         */
        onStart: function () { 
            var myobject = this.options.properties.children[0].app; 
            var myobject1 = this.options.properties.children[1].app;  

            // Not using TopSection - no need for title or breadcrumbs
            this.main = new Main({
                context: this.getContext(),
                apps: [{
                    appName: myobject,
                    title: myobject,
                    subtitle: 'Metrics',
                    url: '#' + myobject,
                    icon: 'network',
                    color: '#7b0663',
                    description: 'Add/Edit/Delete Teams',
                    // favorite: true
                }, {
                    appName: myobject1,
                    title: myobject1,
                    subtitle: 'Metrics',
                    url: '#' + myobject1,
                    icon: 'user',
                    color: '#00625f',
                    description: 'Get Information on how a team is performing',
                    // favorite: false
                }],
                showFavorites: false
            });
            this.main.start(this.getElement());
        }
    });
});