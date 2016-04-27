(function () {
    angular
        .module("GitApp")
        .controller("IssueDashBoardController", IssueDashBoardController);
    function IssueDashBoardController($scope, $http,UserService) {
        var ID="&client_id=baeec5dce056f6a02d9f&client_secret=7212a596cc30e4b6be2590e3361a8e20910dc9bd";
        var ISSUES_URL = "https://api.github.com/repos/OWNER/REPO/issues?state=open&sort=updated&page=1&per_page=100&assignee=*"+ID;

        $scope.x = function() {
            return function(d) {
                return d.category;
            };
        };

        $scope.y = function() {
            return function(d) {
                return d.value;
            };
        };
        console.log(UserService.getCurrentGitUser())
        var newurl =   ISSUES_URL.replace("OWNER", UserService.getCurrentUser().recent_repoowner);
        $http.get(newurl.replace("REPO",UserService.getCurrentUser().recent_reponame))
            .success(function(issues) {
            var assignees = [], data = [];
            issues.forEach(function(issue) {
                assignees.push({category: issue.assignee.login});
            });
            assignees = _.groupBy(assignees, function(assignee) { return assignee.category; });
            assignees = _.sortBy(assignees, function(assignee) { return assignee.length; }).reverse();
            assignees = assignees.slice(0, 10);

            assignees.forEach(function(assignee) {
                data.push({category: assignee[0].category, value: assignee.length});
            });
            $scope.data = data;
        });


    }
})();