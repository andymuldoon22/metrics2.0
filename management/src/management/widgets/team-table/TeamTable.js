define([
    'jscore/core',
    './TeamTableView',
    'tablelib/Table',
    'tablelib/plugins/Selection',
    './cells/icon-cell/ImgCell',
    '../../services/TeamService',
    'widgets/Dialog',
    'i18n!management/dictionary.json'
], function (core, View, Table, Selection, ImgCell, teamService, Dialog, dictionary) {
    'use strict';

    return core.Widget.extend({

        View: View,

        onViewReady: function () {

            var tableColumns = [
                { title: '#', attribute: 'id', width: '15px' },
                { title: dictionary.avatar, attribute: 'avatar', width: '50px', cellType: ImgCell },
                { title: dictionary.teamName, attribute: 'name', width: '100px' },
                { title: dictionary.memberNames, attribute: 'members', width: '500px' },
            ];

            var tablePlugins = [
                new Selection({
                    checkboxes: true,
                    selectableRows: true,
                    multiselect: false,
                    bind: true
                })
            ];

            var tableModifiers = [
                { name: 'striped' } // Applying a different table style
            ];

            var table = new Table({
                columns: tableColumns,
                plugins: tablePlugins,
                modifiers: tableModifiers
            });

            table.addEventHandler('rowselectend', this.onTableSelect.bind(this));
            table.attachTo(this.view.getTable());

            this.table = table;

            this.populateTableData();
        },


        populateTableData: function () {
            teamService.getTeamsSummary(function (data) {
                this.table.setData(data);
            }.bind(this));
        },

        onTableSelect: function (selectedItems) {
            this.selectedTeam = selectedItems.map(function (item) {
                return item.getData();
            });
        },

        deleteSelected: function () {
            var id = this.selectedTeam[0].id;
            var name = this.selectedTeam[0].name;
            var dialogWidget = new Dialog({
                header: 'Delete team',
                content: 'Do you confirm you want to delete ' + name + '?',
                buttons: [{
                    caption: dictionary.confirm,
                    color: 'darkBlue',
                    action: function () {
                        teamService.deleteTeamById(id, function (data) { });
                        this.populateTableData();
                        dialogWidget.hide();
                    }.bind(this)
                }, {
                    caption: dictionary.cancel,
                    action: function () {
                        dialogWidget.hide();
                    }
                }]
            });
            dialogWidget.show();
        }


    });

});
