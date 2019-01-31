/*global define, describe, before, after, beforeEach, afterEach, it, expect */
define([
    'dashboard/Dashboard'
], function (Dashboard) {
    'use strict';

    describe('Dashboard', function () {

        it('Sample BIT test', function () {
            expect(Dashboard).not.to.be.undefined;
        });

    });

});
