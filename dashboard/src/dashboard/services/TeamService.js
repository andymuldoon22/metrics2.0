define([
    'jscore/ext/net',
], function (net) {
    'use strict';

    function getDashStats(fn) {
        net.ajax({
            url: "/teams",
            type: "GET",
            dataType: "json",
            success: fn,
            error: fn
        });
    }

    return {
        getDashStats: getDashStats
    }
});