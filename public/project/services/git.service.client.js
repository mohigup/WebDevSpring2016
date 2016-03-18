(function(){
    var SHA_URL = "http://api.github.com/repos/jannunzi/WebDev/commits/SHA";
    var GIT_SEARCH_URL = "http://api.github.com/users/USERNAME"
    var DETAILS_URL = "https://api.github.com/repos/REPONAME/stats/commit_activity";

    angular
        .module("GitApp")
        .factory("GitIntService", GitIntService);

    function GitIntService($http) {
        var api = {
            findRepoByUsername: findRepoByUsername,
            findRepo: findRepo,
            findRepoStatistics:findRepoStatistics,
            findCommitsBySHA:findCommitsBySHA
        };
        var url = "";

        return api;



        function findRepo(url, callback) {
            //var url = DETAILS_URL.replace("IMDBID", imdbId);
            $http.get(url)
                .success(callback);
        }



        function findRepoStatistics(reponame,callback){
            url =   DETAILS_URL
                .replace("REPONAME", reponame);
            console.log("finding stats by uRL "+ url)
            $http.get(url)
                .success(function(data, status) {
                    console.log("checking blank response findRepoStatistics")
                    status = parseInt(status);
                    console.log("status rerurned"+status)
                    callback(data);
                }).error(function(data, status) {
                console.log("Unable to fetch data "+status);

            });
        }

        function findRepoByUsername(title, callback) {
            console.log("findRepoByUsername");
            var url = GIT_SEARCH_URL
                .replace("USERNAME", title)
                //.replace("PAGE", 1);
            $http.get(url)
                .success(function(data, status) {
                //console.log("checking blank response test")
                   // status = parseInt(status);
                //console.log(status)
                callback(data);
            }).error(function(data, status) {
                console.log("Unable to fetch data "+status);

            });
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