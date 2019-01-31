define([
    'jscore/core',
    'i18n!metrics/dictionary.json',
    'layouts/TopSection',
    './regions/main/Main'
], function (core, dictionary,
             TopSection,
             Main) {
    'use strict';

    return core.App.extend({

        /**
         * Called when the app is first instantiated in the current tab for the first time.
         */
        onStart: function () {
            console.log('metrics 2');
            var eventBus = this.getEventBus(),
                topSection = new TopSection({
                    breadcrumb: this.options.breadcrumb,
                    title: this.options.properties.title,
                    context: this.getContext(),
                    defaultActions: [{
                        type: 'button',
                        name: dictionary.sayHello,
                        action: function () {
                            eventBus.publish('sayhello');
                        }
                    }]
                });

            topSection.setContent(new Main({
                context: this.getContext()
            }));
            topSection.attachTo(this.getElement());
        },

        /**
         * This method is called when the user has left your app to view a different app.
         */
        onPause: function () {

        },

        /**
         * Called when the user navigates back to the application.
         */
        onResume: function () {

        },

        /**
         * Called before the user is about to leave your app, either by navigating away or closing the tab.
         */
        onBeforeLeave: function () {

        }

        // See complete documentation about the application lifecycle in the Container docs.

    });

});
