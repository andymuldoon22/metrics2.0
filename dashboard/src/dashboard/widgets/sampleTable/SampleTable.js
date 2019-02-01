define([
    "jscore/core",
    "tablelib/Table",
    "tablelib/plugins/ColorBand",
    "../../services/TeamService"
], function (core, Table, ColorBand, teamService) {
    return core.Widget.extend({
        id: 'SampleTable',
        actions: [
            {
                name: 'Refresh', action: function () {
                alert('Refresh');
            }
            },
            {
                name: 'Another action', action: function () {
                alert('Another action');
            }
            }
        ],
        init: function () {
            this.tableConfig = {
                plugins: [
                    new ColorBand({
                        color: function (row) {
                            return row.getData().status === 1 ? '#e94d47' : '#a1c845'; // green_80 / red_80
                        }
                    })
                ],
                modifiers: [
                    {name: "striped"}
                ],
                // call api
                data: [
                    {col1: "Roose", col2: "value 1 2", col3: "value 1 3", col4: "value 1 4", col5: "value 1 5"},
                    {col1: "value 1 1", col2: "value 1 2", col3: "value 1 3", col4: "value 1 4", col5: "value 1 5"},
                    {col1: "value 2 1", col2: "value 2 2", col3: "value 2 3", col4: "value 2 4", col5: "value 2 5"},
                    {col1: "value 3 1", col2: "value 3 2", col3: "value 3 3", col4: "value 3 4", col5: "value 3 5"},
                    {col1: "value 4 1", col2: "value 4 2", col3: "value 4 3", col4: "value 4 4", col5: "value 4 5"},
                    {col1: "value 5 1", col2: "value 5 2", col3: "value 5 3", col4: "value 5 4", col5: "value 5 5"},
                    {col1: "value 6 1", col2: "value 6 2", col3: "value 6 3", col4: "value 6 4", col5: "value 6 5"}
                ],
                columns: [
                    {title: "Column 1", attribute: "col1", width: "150px"},
                    {title: "Column 2", attribute: "col2", width: "150px"},
                    {title: "Column 3", attribute: "col3", width: "150px"},
                    {title: "Column 4", attribute: "col4", width: "150px"},
                    {title: "Column 5", attribute: "col5", width: "150px"}
                ]
            };

        },
        initializeTable: function (rawData) {

            this.tableConfig = {
                plugins: [
                    new ColorBand({
                        color: function (row) {
                            return row.getData().status === 1 ? '#e94d47' : '#a1c845'; // green_80 / red_80
                        }
                    })
                ],
                modifiers: [
                    {name: "striped"}
                ],
                rawData,
                data: 
                    rawData,
                columns: [
                    {title: "Team Name", attribute: "name", width: "50px"},
                    {title: "Team Members", attribute: "members", width: "150px"}
                ]
            };

            this.table = new Table(this.tableConfig);
            this.table.attachTo(this.getElement());
        },
        onViewReady: function () {
            teamService.getTeamsSummary(function (data) {
                this.initializeTable(data);
            }.bind(this));
        },
        onSettings: function () {

        },
        toJSON: function () {
            return this.options;
        }

    });
});

// define([
//     "jscore/core",
//     "tablelib/Table",
//     "tablelib/plugins/ColorBand"
// ], function (core, Table, ColorBand) {
//     return core.Widget.extend({
//         id: 'SampleTable',
//         actions: [
//             {
//                 name: 'Refresh', action: function () {
//                 alert('Refresh');
//             }
//             },
//             {
//                 name: 'Another action', action: function () {
//                 alert('Another action');
//             }
//             }
//         ],
//         init: function () {
//             this.tableConfig = {
//                 plugins: [
//                     new ColorBand({
//                         color: function (row) {
//                             return row.getData().status === 1 ? '#e94d47' : '#a1c845'; // green_80 / red_80
//                         }
//                     })
//                 ],
//                 modifiers: [
//                     {name: "striped"}
//                 ],
//                 data: [
//                     {col1: "value 1 1", col2: "value 1 2", col3: "value 1 3", col4: "value 1 4", col5: "value 1 5"},
//                     {col1: "value 2 1", col2: "value 2 2", col3: "value 2 3", col4: "value 2 4", col5: "value 2 5"},
//                     {col1: "value 3 1", col2: "value 3 2", col3: "value 3 3", col4: "value 3 4", col5: "value 3 5"},
//                     {col1: "value 4 1", col2: "value 4 2", col3: "value 4 3", col4: "value 4 4", col5: "value 4 5"},
//                     {col1: "value 5 1", col2: "value 5 2", col3: "value 5 3", col4: "value 5 4", col5: "value 5 5"},
//                     {col1: "value 6 1", col2: "value 6 2", col3: "value 6 3", col4: "value 6 4", col5: "value 6 5"}
//                 ],
//                 columns: [
//                     {title: "Column 1", attribute: "col1", width: "150px"},
//                     {title: "Column 2", attribute: "col2", width: "150px"},
//                     {title: "Column 3", attribute: "col3", width: "150px"},
//                     {title: "Column 4", attribute: "col4", width: "150px"},
//                     {title: "Column 5", attribute: "col5", width: "150px"}
//                 ]
//             };

//         },
//         initializeTable: function () {
//             this.table = new Table(this.tableConfig);
//             this.table.attachTo(this.getElement());
//         },
//         onViewReady: function () {
//             this.initializeTable();

//         },
//         onSettings: function () {

//         },
//         toJSON: function () {
//             return this.options;
//         }

//     });
// });
