(function(){


    angular
        .module("GitApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $http, $routeParams, $location, $route, GitIntService) {


      //  $scope.movieTitle = "Star Wars";
        console.log("Inside SearchController");

        init();

        function init() {
            var uname = $routeParams.title;
            console.log("movieTitle"+uname);
            if(uname) {
                console.log("Inside SearchController INIT");
                fetchRepo(uname);
            }
        }


        function fetchRepo(uname) {
            console.log("fetch movie");
            GitIntService.findRepoByUsername(uname, renderRepos)
        }

        function renderRepos(response) {
            //console.log("original data"+JSON.stringify(response));
            console.log("response repo url"+response.repos_url);
            GitIntService.findRepo(response.repos_url,renderRepo)
            $scope.data = response;

        }

        function renderRepo(response) {
            //console.log("repo data"+JSON.stringify(response));
            $scope.repoData = response;

        }
    }
})();