define([
    'jscore/core',
    '../../widgets/team-table/TeamTable',
    'i18n!management/dictionary.json'
], function (core, TeamTable, dictionary) {
    'use strict';

    return core.Region.extend({

        onStart: function () {
            var teamTable = new TeamTable();
            teamTable.attachTo(this.getElement());
        },

        onStop: function () {
        }

    });

});
