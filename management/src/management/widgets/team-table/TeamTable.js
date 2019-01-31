define([
    'jscore/core',
    './TeamTableView',
    'tablelib/Table',
    'tablelib/plugins/Selection',
    '../../services/TeamService',
    'i18n!management/dictionary.json'
], function (core, View, Table, Selection, teamService, dictionary) {
    'use strict';

    return core.Widget.extend({

        View: View,

        onViewReady: function () {

            var table = new Table({
                columns: [
                    { title: '#', attribute: 'id', width: '15px' },
                    { title: 'Team name', attribute: 'name', width: '100px' },
                    { title: 'Member names', attribute: 'members', width: '500px' },
                ],
                plugins: [
                    new Selection({
                        checkboxes: true,
                        selectableRows: true,
                        multiselect: true,
                        bind: true
                    })
                ],
                modifiers: [
                    { name: 'striped' } // Applying a different table style
                ]
            });

            table.addEventHandler('rowselectend', this.onTableSelect.bind(this));
            table.attachTo(this.view.getTable());

            this.table = table;

            teamService.getTeamsSummary(function (data) {
                this.setData(data);
            }.bind(this));

        },

        onTableSelect: function (selectedItems) {
            var userData = selectedItems.map(function (item) {
                return item.getData();
            });
            this.trigger('user:selected', userData);
        },

        setData: function (data) {
            if (this.emptyTable === true) {
                this.table.attachTo(this.view.getTable());
                this.infoMessage.destroy();

                delete this.emptyTable;
                delete this.infoMessage;
            }

            this.table.setData(data);
            this.data = data;

            if (data.length === 0 && this.infoMessage === undefined) {
                this.emptyTable = true;
                this.table.detach();
                this.infoMessage = new InlineMessage({
                    header: dictionary.get('table.noData.header'),
                    description: dictionary.get('table.noData.message')
                });
                this.infoMessage.attachTo(this.view.getMessageHolder());
            }
        },

        deleteUsers: function (users) {
            var data = this.data.filter(function (item) {
                var indexOfItem = users.indexOf(item);

                if (indexOfItem !== -1) {
                    users.splice(indexOfItem, 1);
                    return false;
                }

                return true;
            });

            this.setData(data);

            this.trigger('user:selected', []);
        }



    });

});
