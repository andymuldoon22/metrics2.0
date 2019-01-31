define([
    'jscore/core',
    'layouts/Dashboard',
    'i18n!dashboard/dictionary.json',
    'widgets/Dropdown',
    '../../widgets/sampleWidget/SampleWidget',
    '../../widgets/lineChart/LineChart',
    '../../widgets/sampleTable/SampleTable',
    '../../widgets/addwidget/AddWidget',
    '../../widgets/pieChart/Pie',
    '../sampleRegion/SampleRegion',
    '../../widgets/settings/Settings',
    '../../widgets/table/Table',
    'container/api',
    './MainView'
], function (core, Dashboard, dictionary, Dropdown, SampleWidget, LineChart, SampleTable, 
    AddWidget, Pie,
     SampleRegion, Settings, Table, container, View) {

    return core.Region.extend({

        View: View,
        //-----------------------------------------------
        onStart: function () {
            var eventBus = this.getEventBus();

            eventBus.subscribe('wipeConfig', function () {
                this.wipeConfig();
                this.drawSimpleDashboard();
            }.bind(this));

            eventBus.subscribe('showConfig', this.showConfig.bind(this));
            eventBus.subscribe('saveConfig', this.persistConfig.bind(this));
            eventBus.subscribe('dashboard:change', this.persistConfig.bind(this));
            eventBus.subscribe('addWidget', this.addWidgetScreen.bind(this));
            eventBus.subscribe('settings', this.settingsScreen.bind(this));

            this.prepareConfig();
            this.drawSimpleDashboard();

            // available widgets for the user to add to the dashboard
            this.availableWidgets = {
                // // Add the import!!!!
                Table: {
                    header: dictionary.get('table.header'),
                    type: 'Table',
                    config: {}
                },
                // SampleTable: {
                //     header: dictionary.get('sampleTable.header'),
                //     type: 'SampleTable',
                //     config: {}
                // },
                SampleWidget: {
                    header: dictionary.get('sampleWidget.header'),
                    type: 'SampleWidget',
                    config: this.sampleWidgetConfig
                },
                LineChart: {
                    header: dictionary.get('lineChart.header'),
                    type: 'LineChart',
                    config: this.lineChartConfig,
                    maximizable: true,
                    settings: false
                }
            };
        },
        //-----------------------------------------------
        settingsScreen: function () {
            if (this.settings === undefined) {
                // the flyout does not destroy the widget,
                // keep the instance and update it
                this.settings = new Settings();

                // listen to the select event and change layout
                this.settings.addEventHandler('apply', onSettingsChange.bind(this));
                this.settings.addEventHandler('cancel', hideFlyout.bind(this));
            }

            this.settings.setSelected(this.dashboard.getCurrentLayout());

            showFlyout(dictionary.settings.dashboardSettings, this.settings);
        },
        //-----------------------------------------------
        addWidgetScreen: function () {
            if (this.addWidget === undefined) {
                // the flyout does not destroy the widget,
                // keep the instance and update it
                this.addWidget = new AddWidget();
                // listen to the add event and add the selected widget
                this.addWidget.addEventHandler('add', onWidgetAdd, this);
                this.addWidget.addEventHandler('cancel', hideFlyout.bind(this));
            }

            // loop through the available widgets and create an array (using Array.map) containing the header and type name.
            var availableWidgets = Object.keys(this.availableWidgets).map(function (wName) {
                return {
                    header: this.availableWidgets[wName].header,   // user friendly, used for select item label
                    type: this.availableWidgets[wName].type        // used for value
                };
            }.bind(this));

            this.addWidget.setAvailableWidgets(availableWidgets);
            this.addWidget.setColumnsLayout(this.dashboard.getCurrentLayout());

            // open the flyout panel to show the add widget screen
            showFlyout(dictionary.settings.addWidget, this.addWidget);
        },
        //-----------------------------------------------
        persistConfig: function () {
            if (this.checkLocalStorage && this.dashboard) {
                localStorage.setItem('config', JSON.stringify(this.dashboard.toJSON()));
            }
        },
        //-----------------------------------------------
        retrieveConfig: function () {
            return (localStorage.getItem('config')) ? JSON.parse(localStorage.getItem('config')) : false;
        },
        //-----------------------------------------------
        wipeConfig: function () {
            if (localStorage.getItem('config')) {
                localStorage.removeItem('config');
            }
        },
        //-----------------------------------------------
        showConfig: function () {
            if (localStorage.getItem('config')) {
                alert(localStorage.getItem('config'));
            }
        },
        //-----------------------------------------------
        checkLocalStorage: function () {
            return typeof(Storage) !== 'undefined';
        },
        //-----------------------------------------------
        drawSimpleDashboard: function () {

            if (this.dashboard) {
                this.dashboard.destroy();
            }

            var config;

            if (this.retrieveConfig()) {
                // load config... this object looks similar to the one below but has the exported state of the dashboard
                config = this.retrieveConfig();

            } else {

                config = {
                    items: [
                        [
                            {
                                header: dictionary.get('table.header'),
                                type: 'Table',
                                config: {},
                                settings: false,
                                maximizable: true
                            },
                            // {
                            //     header: dictionary.get('sampleTable.header'),
                            //     type: 'SampleTable',
                            //     config: {},
                            //     settings: false,
                            //     maximizable: true
                            // },
                            {
                                header: dictionary.get('sampleRegion.header'),
                                type: 'SampleRegion',
                                config: {},
                                maximizable: true
                            }
                        ],
                        [
                            {
                                header: dictionary.get('lineChart.header'),
                                type: 'LineChart',
                                config: this.lineChartConfig,
                                maximizable: true,
                                iid: 'lineChart',
                                settings: true
                            },
                            {
                                header: dictionary.get('sampleWidget.header'),
                                type: 'SampleWidget',
                                config: this.sampleWidgetConfig
                            }
                        ],
                        [
                            {
                                header: dictionary.get('sampleWidget.header'),
                                type: 'SampleWidget',
                                config: this.sampleWidgetConfig
                            },
                            {
                                header: dictionary.get('pieChart.header'),
                                type: 'PieChart',
                                config: {}
                            }
                        ],
                        [
                            {
                                header: dictionary.get('nonClosingWidget.header'),
                                type: 'SampleWidget',
                                config: {
                                    content: dictionary.nonClosingWidget.content
                                },
                                settings: false,
                                closable: false
                            },
                            {
                                header: dictionary.get('sampleWidget.header'),
                                type: 'SampleWidget',
                                config: this.sampleWidgetConfig
                            }
                        ]
                    ],
                    layout: 'four-columns',

                    // i18n options for dashboard
                    maximizeText: dictionary.get('widgetActions.maximize'),
                    minimizeText: dictionary.get('widgetActions.minimize'),
                    settingsText: dictionary.get('tooltips.settingsText'),
                    closeText: dictionary.get('widgetActions.closeText'),
                    emptyDashboardText: dictionary.get('dashboard.emptyDashboardText'),
                    emptyColumnText: dictionary.get('dashboard.emptyColumn')
                };
            }

            config.context = this.getContext();
            config.references = [LineChart, SampleWidget, Pie, Table, SampleTable, 
                SampleRegion];

            this.dashboard = new Dashboard(config);
            this.dashboard.attachTo(this.view.getElement());
            this.persistConfig();

        },
        //-----------------------------------------------
        prepareConfig: function () {
            var dummyText = dictionary.dummyText;

            this.lineChartConfig = {
                data: [{
                    label: "Entry A",
                    data: [
                        {x: 1406296800000, y: 15},
                        {x: 1407300400000, y: 10},
                        {x: 1408304000000, y: 30},
                        {x: 1409307600000, y: 0}
                    ]
                }],
                plotOptions: {
                    scaleType: {
                        x: 'time'
                    }
                }
            };


            this.sampleWidgetConfig = {
                content: dummyText

            };
        }
        //-----------------------------------------------
    });

    //---------------------------------------------------------------
    //---------------------------------------------------------------

    function showFlyout(header, content) {

        // show flyout using container API
        container.getEventBus().publish('flyout:show', {
            header: header,
            content: content
        });
    }

    //-----------------------------------------------
    function hideFlyout() {

        // hide flyout using container API
        container.getEventBus().publish('flyout:hide');
    }

    //-----------------------------------------------

    function onWidgetAdd(options) {
        /*jshint validthis:true */
        if (options === undefined) {
            return;
        }

        options.widgets.forEach(function (wType) {
            if (this.availableWidgets[wType]) {
                this.dashboard.addItem(this.availableWidgets[wType], options.column || 0, 0);
            }
        }.bind(this));

        hideFlyout();
    }

    //-----------------------------------------------

    function onSettingsChange(newLayout) {
        /*jshint validthis:true */
        if (newLayout !== this.dashboard.getCurrentLayout()) {
            this.dashboard.changeLayout(newLayout);
        }
        hideFlyout();
    }

});
