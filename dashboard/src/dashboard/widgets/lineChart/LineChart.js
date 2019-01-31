/*global define, console*/
define([
    'jscore/core',
    'chartlib/charts/Line',
    'i18n!dashboard/dictionary.json'
], function (core, Line, dictionary) {
    'use strict';

    return core.Widget.extend({

        id: 'LineChart',

        actions: [{
            name: dictionary.get('widgetActions.update'),
            action: function () {
                this.lineChart.update([
                        {
                            label: "Entry A",
                            data: [
                                {x: 1406296800000, y: Math.random() * 30},
                                {x: 1407300400000, y: Math.random() * 30},
                                {x: 1408304000000, y: Math.random() * 30},
                                {x: 1409307600000, y: Math.random() * 30}
                            ]
                        }
                    ]
                );
            }
        }],

        onViewReady: function () {
            this.lineChart = new Line(this.options);
            this.lineChart.attachTo(this.getElement());
        },

        onSettings: function () {
            alert('Other "onSettings" implementation.');
        }
    });
});
