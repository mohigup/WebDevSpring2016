(function () {
    angular
        .module("GitApp")
        .controller("PullRequestDashboardController", PullRequestDashboardController);
    function PullRequestDashboardController($scope, $http,UserService) {

         $scope.page = 1;

        console.log("Inside PullRequestDashboardController")
        var ID="&client_id=baeec5dce056f6a02d9f&client_secret=7212a596cc30e4b6be2590e3361a8e20910dc9bd";
        var ISSUES_URL ='https://api.github.com/repos/OWNER/REPO/pulls?state=closed&sort=updated&page=' + $scope.page + '&per_page=100&sort=updated'+ID;


        var NEWURL1 =   ISSUES_URL.replace("OWNER", UserService.getCurrentUser().recent_repoowner);
        var NEWURL2 =   NEWURL1.replace("REPO",UserService.getCurrentUser().recent_reponame);
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