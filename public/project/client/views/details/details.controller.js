(function () {
    angular
        .module("GitApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($routeParams, $timeout, $rootScope, GitIntService,UserService) {

        var vm = this;

        var repo_name = $routeParams.user_name + "/" + $routeParams.repo_name;
        console.log(repo_name);
        var currentGitUser = UserService.getCurrentGitUser();
        console.log(currentGitUser)
        var usr = {
            owner: currentGitUser.owner,
            reponame: $routeParams.repo_name
        };
        console.log(usr)
        UserService.setCurrentGitUser(usr)
        console.log(UserService.getCurrentGitUser());
        fetchRepStats(repo_name);
        GitIntService.findAllCommits(usr);

        //init();

        function fetchRepStats(repo_name) {
            GitIntService
                .findRepoStatistics(repo_name)
                .then(function (response) {

                    console.log("call back after 3 seconds ")
                    $timeout(function () {
                        fetchRepStatsAgain(repo_name)
                    }, 1000);


                },function(err){
                    console.log("seds")
                    vm.message = "No Respone or Data Found";

                });


        }

        function fetchRepStatsAgain(repo_name) {

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