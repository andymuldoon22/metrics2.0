/*global define*/
define([
    'jscore/core',
    'i18n!dashboard/dictionary.json',
    './SettingsView',
    'layouts/DashboardSettings'
], function (core, dictionary, View, DashboardSettings) {
    'use strict';

    return core.Widget.extend({

        view: function () {
            return new View({i18n: dictionary.get('settings')});
        },

        onViewReady: function () {
            var supportedLayouts = [
                'one-column',
                'two-columns',
                'two-columns-30-70',
                'two-columns-70-30',
                'three-columns',
                'three-columns-30-40-30',
                'four-columns'
            ];

            this.dashboardSettings = new DashboardSettings({
                // english is supported by default
                // added other languages in the locales folders

                availableLayouts: supportedLayouts.map(function (layoutName) {
                    return {
                        layout: layoutName,
                        header: dictionary[layoutName]
                    };
                })
            });

            this.dashboardSettings.attachTo(this.view.getContent());

            this.view.getApplyButton().addEventHandler('click', onApply.bind(this));
            this.view.getCancelButton().addEventHandler('click', onCancel.bind(this));
        },
        setSelected: function (selected) {
            this.dashboardSettings.select(selected, true);
        }
    });

    //---------------------------------------------------------------
    //---------------------------------------------------------------

    function onApply() {
        /*jshint validthis:true */
        this.trigger('apply', this.dashboardSettings.getSelected());
    }

    //-----------------------------------------------
    function onCancel() {
        /*jshint validthis:true */
        this.trigger('cancel');
    }

});
