define([
    "jscore/core",
    'chartlib/charts/Pie',
    'container/api',
    'i18n!dashboard/dictionary.json',
    "../../services/TeamService"
], function (core, Pie, container, dictionary, teamService) {

    return core.Widget.extend({

        id: 'PieChart',

        actions: [{
            name: dictionary.get('widgetActions.update'),
            action: function () {

                var newData = [{
                    label: 'Blue Whale',
                    value: Math.random() * 30
                }, {
                    label: 'Barred Owl',
                    value: Math.random() * 30
                }, {
                    label: 'Woodswallow',
                    value: Math.random() * 30
                }];

                container.getEventBus().publish('PieChart:newData', newData);
            }
        }],

        onViewReady: function () {
//get data here from API
            // teamId
            teamService.getTeamIdMemberData(1)
                //function (data) {
                //this.initializeTable(data);
            //}.bind(this));
            
            // data.element

            var commitData = [];
            teamService.getTeamIdMemberData(1, function (data) {
                data.forEach(function (item) {
                    var pieEntry = {
                        label: item.name,
                        value: item.commits
                    };
                    commitData.push(pieEntry);
                })
            }); 
 


            this.getElement().setStyle('height', '300px');

            this.pieChart = new Pie({
                element: this.getElement(),
                data: commitData,
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

