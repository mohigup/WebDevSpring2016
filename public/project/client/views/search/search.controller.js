(function () {


    angular
        .module("GitApp")
        .controller("SearchController", SearchController);

    function SearchController(GitIntService,UserService) {

        var vm = this;

        vm.fetchRepo = fetchRepo;

        function init() {

        }

        init();


        console.log("Inside SearchController");

        function fetchRepo(repo) {
            if(!(repo && repo.owner)){
                vm.message = "Please Enter Username !";
            }
            else{

                var uname = repo.owner;
                console.log("Repo Owner in param is " + uname);
                console.log("Inside SearchController INIT");
                GitIntService
                    .findRepoByUsername(repo.owner)
                    .then(function (response) {
                        UserService.setCurrentGitUser(repo);
                        console.log("response");
                        console.log(response);
                        vm.data = response.data;
                        console.log("vm.data")
                        console.log(vm.data)

                    },
                        function(err){

                            vm.message = "No Such User Exists";
                        }
                    );

            }



        }

        function renderRepos(response) {
            //console.log("original data"+JSON.stringify(response));


        }

        function renderRepo(response) {
            //console.log("repo data"+JSON.stringify(response));
            $scope.repoData = response;

        }
    }
})();