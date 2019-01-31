define([
    'jscore/core',
    'i18n!management/dictionary.json',
    'layouts/TopSection',
    './regions/main/Main',
    './widgets/team-table/TeamTable',
    './regions/main/TableMain',
    './ManagementView'
], function (core, dictionary, TopSection, Main, TeamTable, TableMain, View) {
    'use strict';

    return core.App.extend({

        View: View,

        /**
         * Called when the app is first instantiated in the current tab for the first time.
         */
        onStart: function () {


            var teamTable = new TeamTable({
                context: this.getContext()
            });

            var eventBus = this.getEventBus();

            var topSection = new TopSection({
                breadcrumb: this.options.breadcrumb,
                title: this.options.properties.title,
                context: this.getContext(),
                defaultActions: [{
                    type: 'button',
                    color: 'paleBlue',
                    name: "Add new team",
                    action: function () {
                        // eventBus.publish('sayhello');
                        showClickedActionDialog(this);
                    }
                },
                {
                    type: 'button',
                    name: "View details",
                    action: function () {
                        eventBus.publish('sayhello');
                    }
                },
                {
                    type: 'button',
                    name: "Delete",
                    icon: 'delete',
                    action: function () {
                        eventBus.publish('sayhello');
                    }
                }

                ]
            });

            topSection.setContent(teamTable);

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

    function showClickedActionDialog(me) {
        console.log('here it goes again');
        console.log(window.location.href + '/form');
        window.open(window.location.href + '/form',"_self")

    }

});
