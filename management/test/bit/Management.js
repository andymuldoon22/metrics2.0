/*global define, describe, before, after, beforeEach, afterEach, it, expect */
define([
    'management/Management'
], function (Management) {
    'use strict';

    describe('Management', function () {

        it('Sample BIT test', function () {
            expect(Management).not.to.be.undefined;
        });

    });

});
