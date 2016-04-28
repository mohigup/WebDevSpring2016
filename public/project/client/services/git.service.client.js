(function(){
    var ID="?client_id=baeec5dce056f6a02d9f&client_secret=7212a596cc30e4b6be2590e3361a8e20910dc9bd";
    var SHA_URL = "https://api.github.com/repos/USERNAME/REPONAME/commits/SHA"+ID;
    var GIT_SEARCH_URL = "https://api.github.com/users/USERNAME/repos?per_page=100&client_id=baeec5dce056f6a02d9f&client_secret=7212a596cc30e4b6be2590e3361a8e20910dc9bd"
    var DETAILS_URL = "https://api.github.com/repos/REPONAME/stats/commit_activity?client_id=baeec5dce056f6a02d9f&client_secret=7212a596cc30e4b6be2590e3361a8e20910dc9bd";
    var ALLCOMMITS_URL = "https://api.github.com/repos/USERNAME/REPONAME/commits"+ID+"&page=PGN&per_page=100"
    angular
        .module("GitApp")
        .factory("GitIntService", GitIntService);

    function GitIntService($http,$q,UserService) {
        var api = {
            findRepoByUsername: findRepoByUsername,

            findRepoStatistics:findRepoStatistics,
            findCommitsBySHA:findCommitsBySHA,
            findAllCommits:findAllCommits,
            getCommitsCount:getCommitsCount
        };
        var url = "";
        var commits = [];
        var slides =[];
        var response;
        var sourceSHAPos;
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

        function findAllCommits(user){

            var promises = [];
            var pages = [1,2,3,4,5,6];
            angular.forEach(pages, function(value, key) {
                var deferred = $q.defer();
                console.log(key + ': ' + value);
                var COMMITSURL = ALLCOMMITS_URL;
                var mapObj = {
                    USERNAME:user.owner,
                    REPONAME:user.reponame,
                    PGN:value
                };
                console.log("test crucuial")
                console.log(commits)
                if(commits.length <= 0) {}
                else{
                    if((commits[1].URL).indexOf(UserService.getCurrentUser().recent_reponame) == -1){
                        console.log("commits empty now"+commits.length)
                        commits=[]
                        console.log("commits emptied"+commits.length)
                    }
                    }
                console.log()
                var re = new RegExp(Object.keys(mapObj).join("|"),"gi");
                COMMITSURL  = COMMITSURL.replace(re, function(matched){
                    return mapObj[matched];
                })
                console.log(COMMITSURL);
                console.log("calling")
                $http.get(COMMITSURL).success(function (data) {
                    console.log("inside")
                    deferred.resolve(data);
                });
                promises.push(deferred.promise);
            });
            $q.all(promises).then(
                // success
                // results: an array of data objects from each deferred.resolve(data) call
                function(results) {
                    console.log(results);
                    for (var i in results){
                        for (var j in results[i]){
                            commits.push ({
                                sha:(results[i])[j].sha,
                                URL: (results[i])[j].url,
                                msg: (results[i])[j].commit.message
                            })


                        }
                    }
                    console.log(commits.reverse())
                    console.log(commits.length)
                    // local git user
                    UserService.getCurrentGitUser().commits =commits;
                    //new logic for keeping commit in session
                    var currentSessionUser =UserService.getCurrentUser();
                    console.log("inside git service before call to update commits")
                    console.log(currentSessionUser.recent_reponame)
                    var newUser = {
                        _id: currentSessionUser._id,
                        username: currentSessionUser.username,
                        firstName: currentSessionUser.firstName,
                        lastNamefindAllCommits: currentSessionUser.lastName,
                        password: currentSessionUser.password,
                        email: currentSessionUser.email,
                        recent_repoowner:currentSessionUser. recent_repoowner,
                        recent_reponame:currentSessionUser.recent_reponame,
                        recent_commits : commits
                    };
                    //bycrypt
                    delete newUser.password;
                    UserService.updateThisUser(newUser._id,newUser).then(function(){
                        console.log("user is updated")
                        console.log("user is updated new "+UserService.getCurrentUser().recent_commits.length);
                    })
                },
                // error
                function(results) {
                }
            );




        }

        function getCommitsCount(){

            var count = commits.length - sourceSHAPos + 1
            console.log("comits ")
            console.log(count)
            console.log(sourceSHAPos)
            return count;

        }
        function findCommitsBySHA(sha,user,page) {

            if (page !=0) page = 1
            var mapObj;
            console.log(user);
            commits = UserService.getCurrentUser().recent_commits;
            var elementPos = commits.map(function(x) {return x.sha; }).indexOf(sha);
            sourceSHAPos = elementPos;
            console.log("before adding page no"+elementPos);
            console.log(commits);
            console.log(commits[elementPos])
            elementPos = elementPos + page;
            var objectFound = commits[elementPos];
            var NEW_SHA_URL = objectFound.URL;
            console.log("element position is "+elementPos)
            console.log("after adding page no ");
            console.log(objectFound);
            console.log("NEW_SHA_URL"+NEW_SHA_URL);
            console.log(NEW_SHA_URL);
            SHA_URL = NEW_SHA_URL +ID;
           /* mapObj = {
                USERNAME:user.owner,
                REPONAME:user.reponame,
                SHA:inSHA
            };
            var re = new RegExp(Object.keys(mapObj).join("|"),"gi");
            SHA_URL = SHA_URL.replace(re, function(matched){
                return mapObj[matched];
            });*/
            console.log("SHA URL IS @"+elementPos);
            // C#1
            console.log(SHA_URL)

            $http.get(SHA_URL).success(function (data) {
                response = data;
                console.log('results in $http.get :1');
                console.log(response)
                var sc =[];
                for (var v in response.files){
                    sc.push({
                        content: response.files[v].patch,
                        filename: response.files[v].filename,
                        author: response.commit.author.name,
                        date: response.commit.author.date,
                        msg: response.commit.message,
                        sha: response.sha

                    })
                }
                console.log("array 1 is ")
                console.log(sc)
                slides.push(sc);
                console.log("slides with 1 el  is ")
                console.log(slides)
               // SHA_URL = response.parents[0].url + ID;
                SHA_URL = commits[elementPos +1].URL + ID;
                console.log("SHA URL IS @"+elementPos +1);
                console.log(SHA_URL)
                //C#2
                $http.get(SHA_URL).success(function (data1) {
                    response = data1;
                    console.log('results in $http.get :2');
                    console.log(response)
                    var sc =[];
                    for (var v in response.files){
                        sc.push({
                            content: response.files[v].patch,
                            filename: response.files[v].filename,
                            author: response.commit.author.name,
                            date: response.commit.author.date,
                            msg: response.commit.message,
                            sha: response.sha
                        })
                    }
                    console.log("array 2 is ")
                    console.log(sc)
                    slides.push(sc);
                    console.log("slides with 2 el  is ")
                    console.log(slides)

                    if(commits[elementPos+2]!=null){

                        SHA_URL = commits[elementPos+2].URL + ID;
                        console.log("SHA URL IS @"+elementPos +2);
                        console.log(SHA_URL)
                        //C#3
                        $http.get(SHA_URL).success(function (data1) {
                            response = data1;
                            console.log('results in $http.get :3');
                            console.log(response)
                            var sc = [];
                            for (var v in response.files) {
                                sc.push({
                                    content: response.files[v].patch,
                                    filename: response.files[v].filename,
                                    author: response.commit.author.name,
                                    date: response.commit.author.date,
                                    msg: response.commit.message,
                                    sha: response.sha
                                })
                            }
                            console.log("array 3 is ")
                            console.log(sc)
                            slides.push(sc);
                            console.log("slides with 3 el  is ")
                            console.log(slides)

                            if(commits[elementPos+3]!=null){

                                SHA_URL = commits[elementPos+3].URL + ID;
                                console.log("SHA URL IS @"+elementPos +3);
                                console.log(SHA_URL)
                                //C#4
                                $http.get(SHA_URL).success(function (data1) {
                                    response = data1;
                                    console.log('results in $http.get :4');
                                    console.log(response)
                                    var sc = [];
                                    for (var v in response.files) {
                                        sc.push({
                                            content: response.files[v].patch,
                                            filename: response.files[v].filename,
                                            author: response.commit.author.name,
                                            date: response.commit.author.date,
                                            msg: response.commit.message,
                                            sha: response.sha
                                        })
                                    }
                                    console.log("array 4 is ")
                                    console.log(sc)
                                    slides.push(sc);
                                    console.log("Made 4 calls and updated slides with 4 commits, Slides Length is")
                                    console.log(slides)
                                    console.log(slides.length)
                                });

                            }


                        });
                    }


                });
            });





            console.log(slides)
            return slides;
            //return $http.get(SHA_URL);

        }


    }
})();