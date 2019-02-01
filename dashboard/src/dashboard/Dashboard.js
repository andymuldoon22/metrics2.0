/*global define*/
define([
    'jscore/core',
    'layouts/TopSection',
    './services/TeamService',
    'i18n!dashboard/dictionary.json',
    './widgets/sampleWidget/SampleWidget',
    './regions/main/Main',
    // 'ui-example-lib/Navigation'
], function (core, TopSection, teamService, dictionary, SampleWidget, Main
    //, 
   // navigationUtils
    ) {
    'use strict';

    return core.App.extend({

        onStart: function () {
            this.topSection = new TopSection({
                context: this.getContext(),
                title: dictionary.get('title'),
                breadcrumb: this.options.breadcrumb,
                // breadcrumb: navigationUtils.adaptBreadcrumbForExample('Layout Library', this.options.breadcrumb),
                defaultActions: [
                    {
                        name: dictionary.get('settings.showConfig'),
                        type: 'button',
                        action: function () {
                            this.getEventBus().publish('showConfig');
                        }.bind(this)
                    },
                    {
                        name: dictionary.get('settings.wipeConfig'),
                        type: 'button',
                        action: function () {
                            this.getEventBus().publish('wipeConfig');
                        }.bind(this)
                    },
                    {
                        name: dictionary.get('settings.saveConfig'),
                        type: 'button',
                        action: function () {
                            this.getEventBus().publish('saveConfig');
                        }.bind(this)
                    },
                    {
                        name: dictionary.get('settings.addWidget'),
                        type: 'button',
                        action: function () {
                            this.getEventBus().publish('addWidget');
                        }.bind(this)
                    },
                    {
                        name: dictionary.get('settings.dashboardSettings'),
                        type: 'button',
                        action: function () {
                            this.getEventBus().publish('settings');
                        }.bind(this)
                    }
                ]

            });

            this.topSection.setContent(new Main({context: this.getContext()}));

            this.topSection.attachTo(this.getElement());
        },
    });

});