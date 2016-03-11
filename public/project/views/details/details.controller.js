(function(){
    var DETAILS_URL = "http://www.omdbapi.com/?i=IMDBID&type=movie&plot=full&tomatoes=true";

    angular
        .module("GitApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $http, $routeParams, GitIntService) {

        var vm = this;

        var repo_name = $routeParams.user_name+"/"+$routeParams.repo_name;
        console.log(repo_name);

        function init() {
            fetchRepStats(repo_name);
        }
        init();

        function fetchRepStats(repo_name) {
            GitIntService.findRepoStatistics(repo_name, renderDetails);
        }

        function renderDetails(response) {
            console.log("response returned ");
            console.log(response);
            vm.details = response;
        }
    }
})();