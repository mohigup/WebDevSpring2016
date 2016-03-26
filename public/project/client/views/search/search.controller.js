(function () {


    angular
        .module("GitApp")
        .controller("SearchController", SearchController);

    function SearchController(GitIntService) {

        var vm = this;

        vm.fetchRepo = fetchRepo;

        function init() {

        }

        init();


        console.log("Inside SearchController");

        function fetchRepo(repo) {
            var uname = repo.owner;
            console.log("Repo Owner in param is " + uname);
            if (uname) {
                console.log("Inside SearchController INIT");
                GitIntService
                    .findRepoByUsername(repo.owner)
                    .then(function (response) {
                        console.log("response");
                        console.log(response);
                        vm.data = response.data;
                        console.log("vm.data")
                        console.log(response.data)

                    });
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