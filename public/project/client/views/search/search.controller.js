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

                            console.log("response");
                            console.log(response);
                            vm.data = response.data;
                            console.log("vm.data")
                            console.log(vm.data)

                        UserService.setCurrentGitUser(repo);
                        console.log("repo")
                        console.log(repo)
                        var cu = UserService.getCurrentUser();
                        if(cu){
                            console.log("updating user reponame")
                            var newUser = {
                                _id: cu._id,
                                username: cu.username,
                                firstName: cu.firstName,
                                lastName: cu.lastName,
                                password: cu.password,
                                email: cu.email,
                                recent_repoowner:repo.owner,
                            };
                            //bycrypt
                            delete newUser.password;
                            UserService.updateThisUser(newUser._id,newUser)
                        }



                    },
                        function(err){

                            vm.message = "We are currently facing Issues. Please try after some-time";
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