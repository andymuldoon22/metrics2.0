/*global define, describe, it, expect */
define([
    '../management/services/TeamService'
], function (teamService) {
    'use strict';

    describe('TeamService', function () {

        it('Service Success Callback Invoked on 200 Response from Server', function () {
            var server = sinon.fakeServer.create();
            server.respondWith("GET", "teamsSummary", [200, {
                "Content-Type": "application/json"
            },
                JSON.stringify({})
            ]);

            var successCallback = sinon.spy();
            var failureCallback = sinon.spy();
            teamService.getTeamsSummary(successCallback, failureCallback);

            server.respond();
            expect(successCallback.calledOnce).to.be.true;
            expect(failureCallback.calledOnce).to.be.false;
        });


    });

});
