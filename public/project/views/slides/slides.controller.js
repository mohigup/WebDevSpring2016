"use strict";
(function () {
    angular
        .module("GitApp")
        .controller("SlidesController", SlidesController)

    function SlidesController($rootScope, $scope, $http, $routeParams, $location, GitIntService) {


        //  $scope.movieTitle = "Star Wars";
        console.log("Inside SlidesController");
        init();
        function init() {
            var sha = $routeParams.sha;
            console.log("sha"+sha);
            if(sha) {
                console.log("Inside SlidesController INIT");
                fetchCommits(sha);
            }
        }


        function fetchCommits(sha) {
            console.log("fetch sha");
            GitIntService.findCommitsBySHA(sha, renderCommits)
        }

        function renderCommits(response) {
            //console.log("original data"+JSON.stringify(response));
            console.log("response returned");
            //GitIntService.findRepo(response.repos_url,renderRepo)
            $scope.data = response.files[0].patch;
            //$scope.data = $scope.data.toString()
            console.log($scope.data)
            localStorage.setItem('c', $scope.data);

        }


    }

})();