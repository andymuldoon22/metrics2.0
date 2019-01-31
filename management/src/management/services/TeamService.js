define([
    'jscore/ext/net',
], function (net) {
    'use strict';

    function getTeamsSummary(fn) {
        net.ajax({
            url: "/teamsSummary",
            type: "GET",
            dataType: "json",
            success: fn,
            error: fn
        });
    }

    return {
        getTeamsSummary: getTeamsSummary
    }
});
