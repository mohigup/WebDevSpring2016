(function(){
    var SEARCH_URL = "http://www.omdbapi.com/?s=TITLE&page=PAGE&type=movie";

    angular
        .module("GitApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $http, $routeParams, $location, MovieService) {


      //  $scope.movieTitle = "Star Wars";
        console.log("Inside SearchController");
        init();
        function init() {
            var movieTitle = $routeParams.title;
            console.log("movieTitle"+movieTitle);
            if(movieTitle) {
                console.log("Inside SearchController INIT");
                fetchMovie(movieTitle);
            }
        }


        function fetchMovie(movieTitle) {
            console.log("fetch movie");
            MovieService.findMoviesByTitle(movieTitle, renderMovies)
        }

        function renderMovies(response) {
            //console.log("original data"+JSON.stringify(response));
            console.log("response repo url"+response.repos_url);
            MovieService.findRepo(response.repos_url,renderRepo)
            $scope.data = response;

        }

        function renderRepo(response) {
            //console.log("repo data"+JSON.stringify(response));
            $scope.repoData = response;

        }
    }
})();