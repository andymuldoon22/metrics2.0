/*global define*/
define([
    'jscore/core',
    'layouts/ColumnSelect',
    'widgets/MultiSelectBox',
    './AddWidgetView',
    'i18n!dashboard/dictionary.json'
], function (core, ColumnSelect, MultiSelectBox, View, dictionary) {
    'use strict';

    return core.Widget.extend({

        view: function () {
            return new View({i18n: dictionary.get('widget')});
        },

        //-----------------------------------------------
        onViewReady: function () {
            // instantiate the widgets
            this._widgetMultiSelect = new MultiSelectBox();
            this._columnSelect = new ColumnSelect({
                layout: this.options.layout
            });

            // attach the widgets to the UI
            this._widgetMultiSelect.attachTo(this.view.getWidgetSelect());
            this._columnSelect.attachTo(this.view.getColumnSelect());

            // form event handling
            this.view.getApplyButton().addEventHandler('click', onApply.bind(this));
            this.view.getCancelButton().addEventHandler('click', onCancel.bind(this));
        },
        //-----------------------------------------------
        setAvailableWidgets: function (availableWidgets) {
            var items = Object.keys(availableWidgets).map(function (wType) {
                return {
                    name: availableWidgets[wType].header,
                    value: availableWidgets[wType].type
                };
            });

            this._widgetMultiSelect.setItems(items);
        },
        //-----------------------------------------------
        setColumnsLayout: function (layoutName) {
            this._columnSelect.setColumnLayout(layoutName);
        },
        //-----------------------------------------------
        getConfig: function () {
            return {
                widgets: this._widgetMultiSelect.getValue().map(function (i) {
                    return i.value;
                }),
                column: this._columnSelect.getColumnSelected()
            };
        }
    });

    //---------------------------------------------------------------
    //---------------------------------------------------------------

    function onApply() {
        /*jshint validthis:true */
        this.trigger('add', this.getConfig());
    }

    //-----------------------------------------------
    function onCancel() {
        /*jshint validthis:true */
        this.trigger('cancel');
    }

});
