(function(){
    var DETAILS_URL = "http://www.omdbapi.com/?i=IMDBID&type=movie&plot=full&tomatoes=true";

    angular
        .module("GitApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $http, $routeParams,$timeout,$rootScope, GitIntService) {

        var vm = this;

        var repo_name = $routeParams.user_name+"/"+$routeParams.repo_name;
        console.log(repo_name);

        fetchRepStats(repo_name);



        //init();

        function fetchRepStats(repo_name) {
            GitIntService.findRepoStatistics(repo_name, function(){});
            console.log("added timer 10 ")
            $timeout(function() {fetchRepStatsAgain(repo_name)}, 3000);

        }

        function fetchRepStatsAgain(repo_name){

            GitIntService.findRepoStatistics(repo_name, renderDetails)
            console.log("second call made")
            $rootScope.repo_url = repo_name
        }
        function renderDetails(response) {
            console.log("response returned ");
            console.log("new check in controller"+response.status);
            console.log(response);
            vm.details = response;
            //$scope.apply();
        }

        function renderDummy(response){}


    }
})();