(function(){
    var SHA_URL = "http://api.github.com/repos/jannunzi/WebDev/commits/SHA";
    var GIT_SEARCH_URL = "http://api.github.com/users/USERNAME/repos"
    var DETAILS_URL = "https://api.github.com/repos/REPONAME/stats/commit_activity";

    angular
        .module("GitApp")
        .factory("GitIntService", GitIntService);

    function GitIntService($http) {
        var api = {
            findRepoByUsername: findRepoByUsername,

            findRepoStatistics:findRepoStatistics,
            findCommitsBySHA:findCommitsBySHA
        };
        var url = "";

        return api;


/*
            function findRepo(url, callback) {
            //var url = DETAILS_URL.replace("IMDBID", imdbId);
            $http.get(url)
                .success(callback);
        }*/



        function findRepoStatistics(reponame){
            url =   DETAILS_URL
                .replace("REPONAME", reponame);
            console.log("finding stats by uRL "+ url)
           return  $http.get(url);
           /*     .success(function(data, status) {
                    console.log("checking blank response findRepoStatistics")
                    status = parseInt(status);
                    console.log("status rerurned"+status)
                    callback(data);
                }).error(function(data, status) {
                console.log("Unable to fetch data "+status);

            });*/
        }

        function findRepoByUsername(repoowner) {
            console.log("findRepoByUsername");
            var url = GIT_SEARCH_URL.replace("USERNAME", repoowner)

                return $http.get(url);
        }

        function findCommitsBySHA(sha) {
            console.log("findCommitsBySHA");
            var url = SHA_URL
                .replace("SHA", sha)
            //.replace("PAGE", 1);
            console.log(url);
            return $http.get(url);
        }
    }
})();