/*global define, describe, before, after, beforeEach, afterEach, it, expect */
define([
    'metrics/Metrics'
], function (Metrics) {
    'use strict';

    describe('Metrics', function () {

        it('Sample BIT test', function () {
            expect(Metrics).not.to.be.undefined;
        });

    });

});
