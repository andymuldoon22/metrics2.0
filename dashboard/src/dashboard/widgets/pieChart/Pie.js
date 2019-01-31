define([
    "jscore/core",
    'chartlib/charts/Pie',
    'container/api',
    'i18n!dashboard/dictionary.json'
], function (core, Pie, container, dictionary) {

    return core.Widget.extend({

        id: 'PieChart',

        actions: [{
            name: dictionary.get('widgetActions.update'),
            action: function () {

                var newData = [{
                    label: '2009',
                    value: Math.random() * 30
                }, {
                    label: '2010',
                    value: Math.random() * 30
                }, {
                    label: '2011',
                    value: Math.random() * 30
                }];

                container.getEventBus().publish('PieChart:newData', newData);
            }
        }],

        onViewReady: function () {
            this.getElement().setStyle('height', '300px');

            this.pieChart = new Pie({
                element: this.getElement(),
                data: [{
                    label: '2009',
                    value: 104
                }, {
                    label: '2010',
                    value: 26
                }, {
                    label: '2011',
                    value: 49
                }],
                legend: {
                    align: 'callouts'
                },
                plotOptions: {
                    pie: {
                        innerRadius: 0.6
                    }
                }
            });

            this.eventId = container.getEventBus().subscribe('PieChart:newData', function (data) {
                this.pieChart.update(data);
            }.bind(this));
        },

        onDestroy: function () {
            container.getEventBus().unsubscribe('PieChart:newData', this.eventId);
        },

        onSettings: function () {
            alert('Settings clicked');
        },

        toJSON: function () {
            return this.options;
        }

    });
});

