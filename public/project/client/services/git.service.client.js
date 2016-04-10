(function(){
    var ID="?client_id=baeec5dce056f6a02d9f&client_secret=7212a596cc30e4b6be2590e3361a8e20910dc9bd";
    var SHA_URL = "http://api.github.com/repos/USERNAME/REPONAME/commits/SHA"+ID;
    var GIT_SEARCH_URL = "http://api.github.com/users/USERNAME/repos?per_page=100&client_id=baeec5dce056f6a02d9f&client_secret=7212a596cc30e4b6be2590e3361a8e20910dc9bd"
    var DETAILS_URL = "https://api.github.com/repos/REPONAME/stats/commit_activity?client_id=baeec5dce056f6a02d9f&client_secret=7212a596cc30e4b6be2590e3361a8e20910dc9bd";

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

        function findCommitsBySHA(sha,user) {
            var slides =[];
            var response;
            var mapObj;
            console.log(user);
            var inSHA = sha;
            console.log("inSHA"+inSHA);
            console.log(SHA_URL);
           /* if(SHA_URL.indexOf("SHA") == -1){
                SHA_URL = "http://api.github.com/repos/USERNAME/REPONAME/commits/" + inSHA.toString();
                console.log("asdas")
                console.log(SHA_URL)
                mapObj = {
                    USERNAME:user.owner,
                    REPONAME:user.reponame,
                };
            }
            else{
                 mapObj = {
                    USERNAME:user.owner,
                    REPONAME:user.reponame,
                    SHA:inSHA

                };
            }*/
            mapObj = {
                USERNAME:user.owner,
                REPONAME:user.reponame,
                SHA:inSHA
            };
            var re = new RegExp(Object.keys(mapObj).join("|"),"gi");
            SHA_URL = SHA_URL.replace(re, function(matched){
                return mapObj[matched];
            });
            console.log("SHA URL IS ");
            console.log(SHA_URL)


                $http.get(SHA_URL).success(function (data) {
                    response = data;
                    console.log('results in $http.get :');
                    console.log(response)
                    var sc =[];
                    for (var v in response.files){
                        sc.push({
                            content: response.files[v].patch,
                            filename: response.files[v].filename,
                            author: response.commit.author.name,
                            date: response.commit.author.date
                        })
                    }
                    console.log("array 1 is ")
                    console.log(sc)
                    slides.push(sc);
                    console.log("slides with 1 el  is ")
                    console.log(slides)
                    SHA_URL = response.parents[0].url + ID;
                    $http.get(SHA_URL).success(function (data1) {
                        response = data1;
                        console.log('results in $http.get :');
                        console.log(response)
                        var sc =[];
                        for (var v in response.files){
                            sc.push({
                                content: response.files[v].patch,
                                filename: response.files[v].filename,
                                author: response.commit.author.name,
                                date: response.commit.author.date
                            })
                        }
                        console.log("array 2 is ")
                        console.log(sc)
                        slides.push(sc);
                        console.log("slides with 2 el  is ")
                        console.log(slides)


                    });
                });



            console.log("out of http and below is slides generteated")
            console.log(slides)
            return slides;
            //return $http.get(SHA_URL);

        }


    }
})();