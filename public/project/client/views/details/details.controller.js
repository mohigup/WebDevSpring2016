(function () {
    var DETAILS_URL = "http://www.omdbapi.com/?i=IMDBID&type=movie&plot=full&tomatoes=true";

    angular
        .module("GitApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $http, $routeParams, $timeout, $rootScope, GitIntService) {

        var vm = this;

        var repo_name = $routeParams.user_name + "/" + $routeParams.repo_name;
        console.log(repo_name);

        fetchRepStats(repo_name);


        //init();

        function fetchRepStats(repo_name) {
            GitIntService
                .findRepoStatistics(repo_name)
                .then(function (response) {

                    console.log("call back after 3 seconds ")
                    $timeout(function () {
                        fetchRepStatsAgain(repo_name)
                    }, 3000);


                });


        }

        function fetchRepStatsAgain(repo_name) {

            GitIntService
                .findRepoStatistics(repo_name)
                .then(function (response) {
                    console.log("second call made")
                    $rootScope.repo_url = repo_name
                    console.log("response returned ");
                    console.log("new check in controller" + response.status);
                    console.log(response);
                    vm.details = response.data;
                });
        }
    }
})();