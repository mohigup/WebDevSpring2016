(function () {
    angular
        .module("GitApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($routeParams, $timeout, $rootScope, GitIntService,UserService) {

        var vm = this;

        var repo_name = $routeParams.user_name + "/" + $routeParams.repo_name;
        console.log(repo_name);

       var currentGitUser = UserService.getCurrentGitUser();
        var currentSessionUser = UserService.getCurrentUser();
        console.log("chk if user is updated with reponame")
        console.log(currentSessionUser)

        var usr = {
            owner: currentSessionUser.recent_repoowner,
            reponame: $routeParams.repo_name
        };
        UserService.setCurrentGitUser(usr)
        var newUser = {
            _id: currentSessionUser._id,
            username: currentSessionUser.username,
            firstName: currentSessionUser.firstName,
            lastName: currentSessionUser.lastName,
            password: currentSessionUser.password,
            email: currentSessionUser.email,
            recent_repoowner:currentSessionUser.recent_repoowner,
            recent_reponame:$routeParams.repo_name
        };
        if(currentSessionUser){
            console.log("call to update current reporname")
            //bycrypt
            delete newUser.password;
            UserService.updateThisUser(newUser._id,newUser).then(function (response) {
                console.log("old response")
                console.log(UserService.getCurrentUser())
                console.log("response returned from call to reposname")
                console.log(response.data)

               UserService.setCurrentUser(response.data);
                fetchRepStats(repo_name);
                GitIntService.findAllCommits(usr);
            },function(err){

            });
        }


        //UserService.setCurrentUser()




        //init();

        function fetchRepStats(repo_name) {
            GitIntService
                .findRepoStatistics(repo_name)
                .then(function (response) {

                    console.log("response")
                    console.log(response)
                    console.log("call back after 3 seconds ")
                    console.log(UserService.getCurrentUser());
                    $timeout(function () {
                        fetchRepStatsAgain(repo_name)
                    }, 3000);


                },function(err){
                    console.log("seds")
                    vm.message = "No Respone or Data Found";

                });


        }

        function fetchRepStatsAgain(repo_name) {
            console.log("user is updated new???????????????? "+UserService.getCurrentUser().recent_commits.length);

            GitIntService
                .findRepoStatistics(repo_name)
                .then(function (response) {
                    console.log("second call made")
                    $rootScope.repo_url = repo_name
                    console.log("response returned ");
                    console.log("new check in controller" + response.status);
                    console.log(response);
                    vm.details = response.data;
                });
        }
    }
})();