/*global define, describe, it, expect */
define([
    '../management/services/TeamService'
], function (teamService) {
    'use strict';

    describe('TeamService', function () {

        it('Message Service Success Callback Invoked on 200 Response from Service', function () {
            var server = sinon.fakeServer.create();
            server.respondWith("GET", "teamsSummary", [200, {
                "Content-Type": "application/json"
            },
                JSON.stringify({})
            ]);

            var successCallback = sinon.spy();
            teamService.getTeamsSummary(successCallback);

            server.respond();
            expect(successCallback.calledOnce).to.be.true;
        });


    });

});
