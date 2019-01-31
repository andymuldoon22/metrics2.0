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
            console.log('metrics 1');
            console.log(this);
            console.log(this.options);    
            console.log(this.options.properties.children);    
            console.log(this.options.properties.children[0]);  
            console.log(this.options.properties.children[0]); 
            var myobject = this.options.properties.children[0]; 
            var myobject1 = this.options.properties.children[1];  
            console.log(myobject.app);
            console.log(myobject1.app);

            // Not using TopSection - no need for title or breadcrumbs
            this.main = new Main({
                context: this.getContext(),
                apps: [{
                    appName: myobject.app,
                    title: myobject.app,
                    subtitle: 'Metrics',
                    url: '#management',
                    icon: 'network',
                    color: '#7b0663',
                    description: 'Add/Edit/Delete Teams',
                    // favorite: true
                }, {
                    appName: myobject1.app,
                    title: myobject1.app,
                    subtitle: 'Metrics',
                    url: '#dashboard',
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