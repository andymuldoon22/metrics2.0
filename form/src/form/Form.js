define([
    'jscore/core',
    './widgets/simpleform/SimpleForm',
    'layouts/TopSection'
], function (core, SimpleForm,
             TopSection) {
    'use strict';

    return core.App.extend({

        /**
         * Called when the app is first instantiated in the current tab for the first time.
         */
        onStart: function () {
            this.layout = new TopSection({
                context: this.getContext(),
                title: this.options.properties.title,
                // breadcrumb: navigationUtils.adaptBreadcrumbForExample('Form Validator', this.options.breadcrumb),
                defaultActions: []
            });

            this.layout.setContent(new SimpleForm());
            this.layout.attachTo(this.getElement());
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
