(function () {
    angular
        .module("GitApp")
        .controller("PullRequestDashboardController", PullRequestDashboardController);
    function PullRequestDashboardController($scope, $http,UserService) {

         $scope.page = 1;

        console.log("Inside PullRequestDashboardController")
        var ISSUES_URL ='https://api.github.com/repos/OWNER/REPO/pulls?state=closed&sort=updated&page=' + $scope.page + '&per_page=100&sort=updated'


        var NEWURL1 =   ISSUES_URL.replace("OWNER", UserService.getCurrentGitUser().owner);
        var NEWURL2 =   NEWURL1.replace("REPO",UserService.getCurrentGitUser().reponame);
        $scope.loadData = function() {
            console.log("inside load func")
            $http.get(NEWURL2).success(function(pulls) {
                var pulley = [], data = [];
                pulls.forEach(function(pull) {
                    pulley.push({value: new Date(pull.updated_at).getDay()});
                });
                pulley = _.groupBy(pulley, function(pull) { return pull.value; });
                pulley = _.sortBy(pulley, function(pull, i) { return pull[0].value; });
                pulley.forEach(function(pull, i) {
                    data.push([i, pull.length]);
                });
                $scope.data2 = [{
                    "key": "Sun - Sat",
                    "values": data
                }];


            });
        };
        $scope.loadData();
    }
})();