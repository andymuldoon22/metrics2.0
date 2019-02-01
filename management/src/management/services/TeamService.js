define([
    'jscore/ext/net',
], function (net) {
    'use strict';

    function getTeamsSummary(successCallback, failureCallback) {
        net.ajax({
            url: "/teamsSummary",
            type: "GET",
            dataType: "json",
            success: successCallback,
            error: failureCallback
        });
    }

    function deleteTeamById(id, successCallback, failureCallback) {
        net.ajax({
            url: "/teams/" + id,
            type: "DELETE",
            success: successCallback,
            error: failureCallback
        });
    }

    return {
        getTeamsSummary: getTeamsSummary,
        deleteTeamById: deleteTeamById
    }
});
