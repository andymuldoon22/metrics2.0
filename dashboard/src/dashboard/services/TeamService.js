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

    function getTeamsSummary(successCallback, failureCallback) {
        net.ajax({
            url: "/teamsSummary",
            type: "GET",
            dataType: "json",
            success: successCallback,
            error: failureCallback
        });
    }

    function getTeamIdMemberData(id, successCallback, failureCallback) {
        net.ajax({
            url: "/teams/"+id+"/members",
            type: "GET",
            dataType: "json",
            success: successCallback,
            error: failureCallback
        });
    }

    return {
        getDashStats: getDashStats,
        getTeamsSummary: getTeamsSummary,
        getTeamIdMemberData: getTeamIdMemberData
    }
});