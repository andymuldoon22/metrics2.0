/*global define, describe, before, after, beforeEach, afterEach, it, expect */
define([
    'jscore/core',
    'management/widgets/team-table/TeamTable'
], function (core, TeamTable) {
    'use strict';
    var app,
        tableWidget;

    beforeEach(function (done) {

        // Create a generic app with View and root DOM element.
        var TestApp = core.App.extend({

            View: core.View.extend({
                getTemplate: function () {
                    return "<div></div>";
                }
            }),

            onStart: function () {
                this.teamTable = new TeamTable();
                this.teamTable.attachTo(this.getElement());
                tableWidget = this.teamTable;
            }
        });
        app = new TestApp();
        app.start(document.getElementById('bitContainer'));
        done();
    });

    afterEach(function () {
        app.stop();
    });

    describe('MessageBox functionality ', function () {

        it('Table is created', function () {
            console.log('test');
            var table = document.querySelector(".eaManagement-wTeamTable");
            expect(table != undefined).to.be.true;
        });

        it('Table has data', function () {
            console.log('test');
            var data = tableWidget.table.getData();
            expect(data.length == 10).to.be.true;
        });


        it('Table is populated with names', function () {
            console.log('test');
            var data = tableWidget.table.getData();
            var firstTeamName = data[0].name; // Names are random, can't assert the string
            expect(firstTeamName != null).to.be.true;
        });

       
    });
});
