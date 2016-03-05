(function(){
    var SHA_URL = "http://api.github.com/repos/jannunzi/WebDev/commits/SHA";
    var GIT_SEARCH_URL = "http://api.github.com/users/USERNAME"
    var DETAILS_URL = "http://api.github.com/repos/REPONAME/stats/commit_activity";

    angular
        .module("GitApp")
        .factory("MovieService", MovieService);

    function MovieService($http) {
        var api = {
            findMoviesByTitle: findMoviesByTitle,
            findMovieByImdbId: findMovieByImdbId,
            findRepo: findRepo,
            findRepoStatistics:findRepoStatistics,
            findCommitsBySHA:findCommitsBySHA
        };

        return api;

        function findMovieByImdbId(imdbId, callback) {
            var url = DETAILS_URL.replace("IMDBID", imdbId);
            $http.get(url)
                .success(callback);
        }

        function findRepo(url, callback) {
            //var url = DETAILS_URL.replace("IMDBID", imdbId);
            $http.get(url)
                .success(callback);
        }

        function findRepoStatistics(reponame,callback){
            var url =   DETAILS_URL
                .replace("REPONAME", reponame)
            console.log("finding stats by uRL "+ url)
            $http.get(url)
                .success(callback);
        }

        function findMoviesByTitle(title, callback) {
            console.log("findMoviesByTitle");
            var url = GIT_SEARCH_URL
                .replace("USERNAME", title)
                //.replace("PAGE", 1);
            $http.get(url)
                .success(callback);
        }

        function findCommitsBySHA(sha, callback) {
            console.log("findCommitsBySHA");
            var url = SHA_URL
                .replace("SHA", sha)
            //.replace("PAGE", 1);
            console.log(url);
            $http.get(url)
                .success(callback);
        }
    }
})();