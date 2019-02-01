var chance = require('chance').Chance();

module.exports = function (app) {

    var teamList = [];
    var memberList = [];
    var initialTeamId = 1;
    var initialMemberId = 1;
    teamList = generateTeamList(10);


    /**
     *  Team endpoints
     */

    app.get("/teams", function (request, response) {
        response.set('Content-Type', 'application/json');
        response.send(JSON.stringify(teamList));
    });

    app.get("/teams/:teamId", function (request, response) {
        var teamId = getTeamId(request);
        var team = findTeamById(teamId);
        response.set('Content-Type', 'application/json');
        response.send(JSON.stringify(team));
    });

    app.get("/teams/:teamId/members", function (request, response) {
        var teamId = getTeamId(request);
        var team = findTeamById(teamId);
        response.set('Content-Type', 'application/json');
        response.send(JSON.stringify(team.members));
    });

    app.get("/teams/:teamId/members/:memberId", function (request, response) {
        var teamId = getTeamId(request);
        var memberId = getMemberId(request);
        var team = findTeamById(teamId);
        var member = findMemberById(team.members, memberId);
        response.set('Content-Type', 'application/json');
        response.send(JSON.stringify(member));
    });

    app.post("/teams", function (request, response) {
        var team = request.body;
        team.id = initialTeamId;
        teamList.push(team);
        initialTeamId++;
        response.status(201).send();
        // need to set ids on members
    });

    app.delete("/teams/:teamId", function (request, response) {
        var teamId = getTeamId(request);
        var team = findTeamById(teamId);
        var index = teamList.indexOf(team);
        if (index !== -1) teamList.splice(index, 1);
        response.status(201).send();
    });


    /**
     * Team summary endpoints
     */


    app.get("/teamsSummary", function (request, response) {
        var teamSummaryList = [];

        teamList.forEach(function (item) {
            var teamSummary = {};
            teamSummary.name = item.name;
            teamSummary.id = item.id;
            teamSummary.avatar = item.avatar;
            teamSummary.members = item.members.map(function (item) {
                return item['name'];
            }).join(", ");

            teamSummaryList.push(teamSummary);
        });

        response.set('Content-Type', 'application/json');
        response.send(JSON.stringify(teamSummaryList));
    });


    /**
     *  Member endpoints
     */

    app.get("/members", function (request, response) {
        response.set('Content-Type', 'application/json');
        response.send(JSON.stringify(memberList));
    });

    app.get("/members/:memberId", function (request, response) {
        var memberId = getMemberId(request);
        var member = findMemberById(memberList, memberId);
        response.set('Content-Type', 'application/json');
        response.send(JSON.stringify(member));
    });


    function getTeamId(request) {
        return request.params.teamId;
    }

    function getMemberId(request) {
        return request.params.memberId;
    }

    function findTeamById(id) {
        return teamList.find(team => team.id == id);
    }

    function findMemberById(members, id) {
        return members.find(member => member.id == id);
    }


    /** Data Generation **/

    
    /**
     * Team member creation
     * 
     * @param {any} name
     */
    function createTeam(name) {
        var members = generateMemberList(10);
        var stats = generateStats(10);
        var team = {
            id: initialTeamId,
            name: name,
            avatar: getRandomAvatar(),
            members: members,
            stats: stats
        };
        initialTeamId++;
        return team;
    }

    /**
     * Team member creation
     * 
     * @param {any} name
     */
    function createMember(name) {
        var member = {
            id: initialMemberId,
            name: name,
            commits: chance.integer({ min: 1, max: 50 })
        }
        initialMemberId++;
        return member;
    }

    /**
     * Team stats creation
     * 
     * @param {any} name
     */
    function createStats(name) {
        var stats = {
            sprint: name,
            points: chance.integer({ min: 1, max: 50 })
        };
        return stats;
    }

    function generateTeamList(number) {
        var teams = [];
        for (var i = 1; i <= number; i++) {
            var member = createTeam(chance.animal());
            teams.push(member);
        }
        return teams;
    }

    function generateStats(number) {
        var statsArray = [];
        for (var i = 1; i <= number; i++) {
            var stats = createStats("Sprint " + i);
            statsArray.push(stats);
        }
        return statsArray;
    }

    function generateMemberList(number) {
        var members = [];
        for (var i = 1; i <= number; i++) {
            var member = createMember(chance.name());
            // List of all members (regardless of the team)
            memberList.push(member);
            // List of team members
            members.push(member);
        }
        return members;
    }

    function getRandomAvatar() {
        return chance.avatar();
    }

}