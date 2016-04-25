(function () {


    angular
        .module("GitApp")
        .controller("CommitsController", CommitsController);

    function CommitsController(GitIntService,UserService) {

        console.log("Loaded CommiteController")
        var vm = this;


        function init() {

            vm.commits = UserService.getCurrentGitUser().commits;
            console.log(vm.commits.length);
            console.log(vm.commits[0].msg);
            setTimeout( function(){$('#commitsTable').dataTable(); }, 2000);
        }

        init();
    }
})();